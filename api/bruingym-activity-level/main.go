package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"

	"github.com/PuerkitoBio/goquery"
	"github.com/joho/godotenv"
)

type ZoneData struct {
	Name       string `json:"name"`
	Percentage string `json:"percentage"`
}

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Error loading .env file")
		return
	}

	http.HandleFunc("/facility", handleFacility)

	port := ":1337"
	fmt.Printf("Starting server on port %s\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		fmt.Printf("Error starting server: %v\n", err)
	}
}

func handleFacility(w http.ResponseWriter, r *http.Request) {
	// Prevents Access Control errors that arise from connect to react port
	w.Header().Set("Access-Control-Allow-Origin", "*") 
    w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS") 
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization") 

    // Handle preflight request
    if r.Method == http.MethodOptions {
        w.WriteHeader(http.StatusOK)
        return
    }

	facility := r.URL.Query().Get("facility")
	if facility == "" {
		http.Error(w, "Facility query is required", http.StatusBadRequest)
		return
	}

	var facilityNumber string
	switch strings.ToLower(facility) {
	case "jwc":
		facilityNumber = "802"
	case "bfit":
		facilityNumber = "803"
	case "krc":
		facilityNumber = "804"
	default:
		http.Error(w, "Invalid facility. Use 'jwc', 'bfit' or 'krc'.", http.StatusBadRequest)
		return
	}

	key := os.Getenv("KEY")
	if key == "" {
		http.Error(w, "API key not found", http.StatusInternalServerError)
		return
	}
	url := "https://connect2concepts.com/connect2/?type=bar&facility=" + facilityNumber + "&key=" + key

	zones, err := scrapeBarCharts(url)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error scraping bar charts: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(zones)
}

func scrapeBarCharts(url string) ([]ZoneData, error) {
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return nil, fmt.Errorf("Error creating request: %v", err)
	}

	req.Header.Set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8")
	req.Header.Set("Accept-Language", "en-US,en;q=0.7")
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

	var zones []ZoneData

	document.Find(".barChart").Each(func(i int, s *goquery.Selection) {
		zoneName := strings.TrimSpace(s.Contents().First().Text())
		percentage := s.Find(".barChart__value").Text()

		zones = append(zones, ZoneData{Name: zoneName, Percentage: percentage})
	})

	return zones, nil
}
