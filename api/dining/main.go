package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/PuerkitoBio/goquery"
	"github.com/gorilla/mux"
)

type DiningHall struct {
	Name   string `json:"name"`
	Status string `json:"status"`
	Time   string `json:"time,omitempty"`
}

type MenuItem struct {
    Name        string   `json:"name"`
    Station     string   `json:"station"`
    Description string   `json:"description,omitempty"`
    Dietary     []string `json:"dietary,omitempty"`
}

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/open", handleOpen)
	r.HandleFunc("/later", handleLater)
	r.HandleFunc("/closed", handleClosed)
	r.HandleFunc("/status/{name}", handleDiningHallStatus)
	r.HandleFunc("/menu/{name}", handleDiningHallMenu)

	port := ":1338"
	fmt.Printf("Starting server on port %s\n", port)
	if err := http.ListenAndServe(port, r); err != nil {
		fmt.Printf("Error starting server: %v\n", err)
	}
}

func handleDiningHallMenu(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    name := vars["name"]

    // Map the dining hall name to the URL format
    hallName := name

    menuItems, err := scrapeMenuData(hallName)
    if err != nil {
        http.Error(w, fmt.Sprintf("Failed to scrape menu data: %v", err), http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(menuItems)
}

func scrapeMenuData(hallName string) ([]MenuItem, error) {
    // Construct the URL for the dining hall menu
    url := fmt.Sprintf("https://menu.dining.ucla.edu/Menus/%s", hallName)

    // Fetch and parse the HTML document
    doc, err := fetchAndParse(url)
    if err != nil {
        return nil, fmt.Errorf("error fetching and parsing menu page: %v", err)
    }

    var menuItems []MenuItem

    // Select menu sections
    doc.Find(".menu-block").Each(func(i int, s *goquery.Selection) {
        station := s.Find(".menu-section-header").Text()
        s.Find(".menu-item").Each(func(j int, item *goquery.Selection) {
            name := item.Find(".menu-item-name").Text()
            description := item.Find(".menu-item-description").Text()

            // Extract dietary icons
            var dietary []string
            item.Find(".menu-item-icons img").Each(func(k int, iconSel *goquery.Selection) {
                altText, exists := iconSel.Attr("alt")
                if exists {
                    dietary = append(dietary, altText)
                }
            })

            menuItem := MenuItem{
                Name:        strings.TrimSpace(name),
                Station:     strings.TrimSpace(station),
                Description: strings.TrimSpace(description),
                Dietary:     dietary,
            }
            menuItems = append(menuItems, menuItem)
        })
    })

    return menuItems, nil
}

func handleDiningHallStatus(w http.ResponseWriter, r *http.Request) {
	prepareHeaders(w, r)

	vars := mux.Vars(r)
	name := vars["name"]
	if name == "" {
		http.Error(w, "Dining hall name is required", http.StatusBadRequest)
		return
	}

	halls, err := scrapeDiningData()
	if err != nil {
		http.Error(w, fmt.Sprintf("Error scraping dining data: %v", err), http.StatusInternalServerError)
		return
	}

	nameLower := strings.ToLower(name)
	for _, hall := range halls {
		if strings.ToLower(hall.Name) == nameLower {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(hall)
			return
		}
	}

	http.Error(w, "Dining hall not found", http.StatusNotFound)
}

func handleOpen(w http.ResponseWriter, r *http.Request) {
	prepareHeaders(w, r)

	halls, err := scrapeDiningData()
	if err != nil {
		http.Error(w, fmt.Sprintf("Error scraping dining data: %v", err), http.StatusInternalServerError)
		return
	}

	var openHalls []DiningHall
	for _, hall := range halls {
		if hall.Status == "Open" {
			fmt.Printf("Open Hall: %+v\n", hall) // Debugging log
			openHalls = append(openHalls, hall)
		}
	}

	if len(openHalls) == 0 {
		fmt.Println("No open halls found")
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(openHalls)
}

func handleLater(w http.ResponseWriter, r *http.Request) {
	prepareHeaders(w, r)

	halls, err := scrapeDiningData()
	if err != nil {
		http.Error(w, fmt.Sprintf("Error scraping dining data: %v", err), http.StatusInternalServerError)
		return
	}

	var laterHalls []DiningHall
	for _, hall := range halls {
		if hall.Status == "Later" {
			laterHalls = append(laterHalls, hall)
		}
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(laterHalls)
}

func handleClosed(w http.ResponseWriter, r *http.Request) {
	prepareHeaders(w, r)

	// Scrape dining hall data
	halls, err := scrapeDiningData()
	if err != nil {
		http.Error(w, fmt.Sprintf("Error scraping dining data: %v", err), http.StatusInternalServerError)
		return
	}

	// Track open and later halls
	openLaterMap := make(map[string]bool)
	for _, hall := range halls {
		if hall.Status == "Open" || hall.Status == "Later" {
			openLaterMap[strings.ToLower(hall.Name)] = true
		}
	}

	// Predefined list of all dining halls
	allHalls := []string{

		"Epicuria", "De Neve", "Spice Kitchen at Feast", "Bruin Plate",
		"Bruin Café", "Café 1919", "Rendezvous", "The Study at Hedrick",
		"The Drey", "Epic at Ackerman",
	}

	var closedHalls []DiningHall
	for _, name := range allHalls {
		if !openLaterMap[strings.ToLower(name)] {
			closedHalls = append(closedHalls, DiningHall{Name: name, Status: "Closed"})
		}
	}

	// Respond with the closed halls
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(closedHalls)
}

func prepareHeaders(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}
}

func fetchAndParse(url string) (*goquery.Document, error) {
    resp, err := http.Get(url)
    if err != nil {
        return nil, fmt.Errorf("error fetching URL: %v", err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return nil, fmt.Errorf("request to %s failed with status code %d", url, resp.StatusCode)
    }

    doc, err := goquery.NewDocumentFromReader(resp.Body)
    if err != nil {
        return nil, fmt.Errorf("error parsing HTML: %v", err)
    }

    return doc, nil
}

func scrapeDiningData() ([]DiningHall, error) {
    url := "https://menu.dining.ucla.edu/"
    doc, err := fetchAndParse(url)
    if err != nil {
        return nil, fmt.Errorf("error fetching and parsing main page: %v", err)
    }

    var diningHalls []DiningHall

    // Find dining hall sections
    doc.Find(".dining-location").Each(func(i int, s *goquery.Selection) {
        name := s.Find(".location-title").Text()
        status := s.Find(".location-status").Text()
        time := s.Find(".location-hours").Text()

        name = strings.TrimSpace(name)
        status = strings.TrimSpace(status)
        time = strings.TrimSpace(time)

        // Add logging
        fmt.Printf("Scraped Dining Hall: '%s', Status: '%s', Time: '%s'\n", name, status, time)

        // Map status to standard codes
        var statusCode string
        switch status {
        case "Open Now":
            statusCode = "O"
        case "Opening Soon":
            statusCode = "L"
        default:
            statusCode = "C"
        }

        diningHall := DiningHall{
            Name:   name,
            Status: statusCode,
            Time:   time,
        }
        diningHalls = append(diningHalls, diningHall)
    })

    return diningHalls, nil
}