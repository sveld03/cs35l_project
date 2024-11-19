package main

import (
	"encoding/json"
	"fmt"
	"io"
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

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/open", handleOpen)
	r.HandleFunc("/later", handleLater)
	r.HandleFunc("/closed", handleClosed)
	r.HandleFunc("/status/{name}", handleDiningHallStatus)

	port := ":1338"
	fmt.Printf("Starting server on port %s\n", port)
	if err := http.ListenAndServe(port, r); err != nil {
		fmt.Printf("Error starting server: %v\n", err)
	}
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
		"Epicuria", "De Neve", "Spice Kitchen at Feast", "Bruin Plate", "Bruin Café", "Café 1919", "Rendezvous", "The Study at Hedrick", 
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

func scrapeDiningData() ([]DiningHall, error) {
	url := "https://menu.dining.ucla.edu"
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return nil, fmt.Errorf("Error creating request: %v", err)
	}

	req.Header.Set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
	req.Header.Set("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("Error making request: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("Request failed with status code: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("Error reading response body: %v", err)
	}

	document, err := goquery.NewDocumentFromReader(strings.NewReader(string(body)))
	if err != nil {
		return nil, fmt.Errorf("Error loading HTML into goquery: %v", err)
	}

	var halls []DiningHall

	document.Find(".content-block").Each(func(i int, block *goquery.Selection) {
		title := block.Find("h3").Text()
		block.Find("p").Each(func(j int, p *goquery.Selection) {
			name := strings.TrimSpace(p.Find(".unit-name").Text())
			if name == "" {
				return
			}

			status := "Closed"
			time := ""

			text := strings.ToLower(p.Text())
			if strings.Contains(text, "open for") || strings.Contains(text, "is open until") {
				status = "Open"
				time = strings.TrimSpace(p.Find(".time").Text())
			} else if strings.Contains(title, "Eat soon") || strings.Contains(text, "opens at") {
				status = "Later"
				time = strings.TrimSpace(p.Find(".time").Text())
			}

			hall := DiningHall{Name: name, Status: status, Time: time}
			halls = append(halls, hall)
		})
	})

	return halls, nil
}
