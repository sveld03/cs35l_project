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

type Menu struct {
	DiningHall string   `json:"dining_hall"`
	Items      []string `json:"items"`
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

func handleDiningHallMenu(w http.ResponseWriter, r *http.Request) {
	prepareHeaders(w, r)

	vars := mux.Vars(r)
	name := strings.ToLower(vars["name"])
	urls := map[string]string{
		"deneve":           "http://menu.dining.ucla.edu/Menus/DeNeve",
		"epicuria":         "http://menu.dining.ucla.edu/Menus/Epicuria",
		"bruinplate":       "http://menu.dining.ucla.edu/Menus/BruinPlate",
		"bruincafe":        "http://menu.dining.ucla.edu/Menus/BruinCafe",
		"cafe1919":         "http://menu.dining.ucla.edu/Menus/Cafe1919",
		"rendezvous":       "http://menu.dining.ucla.edu/Menus/Rendezvous",
		"hedrickstudy":     "http://menu.dining.ucla.edu/Menus/HedrickStudy",
		"drey":             "http://menu.dining.ucla.edu/Menus/Drey",
		"epicatackerman":   "http://menu.dining.ucla.edu/Menus/EpicAtAckerman",
		"denevelatenight":  "http://menu.dining.ucla.edu/Menus/DeNeveLateNight",
		"feastatrieber":    "http://menu.dining.ucla.edu/Menus/FeastAtRieber",
	}

	url, exists := urls[name]
	if !exists {
		http.Error(w, "Dining hall not found", http.StatusNotFound)
		return
	}

	// Special handling for dining halls without breakfast/lunch/dinner structure
	noMealTypes := map[string]bool{
		"bruincafe":        true,
		"cafe1919":         true,
		"rendezvous":       true,
		"hedrickstudy":     true,
		"drey":             true,
		"epicatackerman":   true,
		"denevelatenight":  true,
		"feastatrieber":    true,
	}

	if noMealTypes[name] {
		menu, err := scrapeDiningMenu(url, strings.Title(name))
		if err != nil {
			http.Error(w, fmt.Sprintf("Error scraping menu data for %s: %v", name, err), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(menu)
		return
	}

	// Default: Handle dining halls with breakfast, lunch, and dinner
	meals := []string{"Breakfast", "Lunch", "Dinner"}
	allMenus := make(map[string]Menu)

	for _, meal := range meals {
		fullURL := fmt.Sprintf("%s/%s", url, meal)
		menu, err := scrapeDiningMenu(fullURL, fmt.Sprintf("%s (%s)", strings.Title(name), meal))
		if err != nil {
			http.Error(w, fmt.Sprintf("Error scraping menu data for %s: %v", meal, err), http.StatusInternalServerError)
			return
		}
		allMenus[meal] = menu
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(allMenus)
}




func scrapeDiningMenu(url, hallName string) (Menu, error) {
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return Menu{}, fmt.Errorf("Error creating request: %v", err)
	}

	req.Header.Set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
	req.Header.Set("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return Menu{}, fmt.Errorf("Error making request: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return Menu{}, fmt.Errorf("Request failed with status code: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return Menu{}, fmt.Errorf("Error reading response body: %v", err)
	}

	document, err := goquery.NewDocumentFromReader(strings.NewReader(string(body)))
	if err != nil {
		return Menu{}, fmt.Errorf("Error loading HTML into goquery: %v", err)
	}

	var items []string
	document.Find(".menu-item").Each(func(i int, item *goquery.Selection) {
		itemName := strings.TrimSpace(item.Find(".recipelink").Text())
		if itemName != "" {
			items = append(items, itemName)
		}
	})

	return Menu{DiningHall: hallName, Items: items}, nil
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
			openHalls = append(openHalls, hall)
		}
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

	halls, err := scrapeDiningData()
	if err != nil {
		http.Error(w, fmt.Sprintf("Error scraping dining data: %v", err), http.StatusInternalServerError)
		return
	}

	openLaterMap := make(map[string]bool)
	for _, hall := range halls {
		if hall.Status == "Open" || hall.Status == "Later" {
			openLaterMap[strings.ToLower(hall.Name)] = true
		}
	}

	allHalls := []string{
		"Epicuria", "De Neve", "Spice Kitchen at Feast", "Bruin Plate",
		"Bruin Café", "Café 1919", "Rendezvous", "The Study at Hedrick",
		"The Drey", "Epic at Ackerman", "Late Night De Neve",
	}

	var closedHalls []DiningHall
	for _, name := range allHalls {
		if !openLaterMap[strings.ToLower(name)] {
			closedHalls = append(closedHalls, DiningHall{Name: name, Status: "Closed"})
		}
	}

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
	req.Header.Set("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36")

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
			} else if strings.Contains(title, "Eat soon") || strings.Contains(text, "opens at") || strings.Contains(text, "opens for") {
				status = "Later"
				time = strings.TrimSpace(p.Find(".time").Text())
			}

			hall := DiningHall{Name: name, Status: status, Time: time}
			halls = append(halls, hall)
		})
	})

	return halls, nil
}