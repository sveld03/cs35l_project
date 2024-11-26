package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type SeparatedHours struct {
	FallQuarterHours []string `json:"fallQuarterHours"`
	SpecialHours     []string `json:"specialHours"`
	FinalsWeek       []string `json:"finalsWeek"`
	WinterBreak      []string `json:"winterBreak"`
	Location         string   `json:"location"`
}

func getBFITData() SeparatedHours {
	return SeparatedHours{
		FallQuarterHours: []string{
			"Monday-Thursday: 6:00 AM - 1:00 AM",
			"Friday: 6:00 AM - 9:00 PM",
			"Saturday: 9:00 AM - 6:00 PM",
			"Sunday: 9:00 AM - 11:00 PM",
		},
		SpecialHours: []string{
			"11/8-11/11, F-Su: 9:00 AM - 6:00 PM",
			"11/27, W, 6:00 AM - 3:00 PM",
			"11/28-11/30, Th-S: CLOSED",
			"12/1, Su: 3:00 PM - 11:00 PM",
		},
		FinalsWeek: []string{
			"Monday - Wednesday: 6:00 AM - 12:00 AM",
			"Thursday: 6:00 AM - 9:00 PM",
			"Friday: 6:00 AM - 3:00 PM",
			"Saturday - Sunday: CLOSED",
		},
		WinterBreak: []string{
			"12/16 – 1/5, CLOSED",
		},
		Location: "251 Charles E Young Dr. W Los Angeles, CA 90095 Carnesale Commons, (underneath Bruin Plate)",
	}
}

func getJWCData() SeparatedHours {
	return SeparatedHours{
		FallQuarterHours: []string{
			"Monday-Thursday: 5:15 AM - 1:00 AM",
			"Friday: 5:15 AM - 10:00 PM",
			"Saturday: 8:00 AM - 8:00 PM",
			"Sunday: 8:00 AM - 11:00 PM",
		},
		SpecialHours: []string{
			"11/8, F, 5:15 AM - 10:00 PM",
			"11/9-11/11, Sa-M, 9:00 AM - 6:00 PM",
			"11/12, Tu, 5:15 AM - 1:00 AM",
		},
		FinalsWeek: []string{
			"12/6, F, 5:15 AM - 10:00 PM",
			"12/7, Sa, 8:00 AM - 8:00 PM",
			"12/8, Su, 8:00 AM - 11:00 PM",
		},
		WinterBreak: []string{
			"12/16 – 12/20, M-F, 9:00 AM - 5:00 PM",
			"12/21 – 1/1, CLOSED",
		},
		Location: "The John Wooden Center sits atop Parking Structure 4 on Westwood Plaza just south of Sunset Boulevard.",
	}
}

func bfitHandler(w http.ResponseWriter, r *http.Request) {
	data := getBFITData()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

func jwcHandler(w http.ResponseWriter, r *http.Request) {
	data := getJWCData()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

func main() {

	http.HandleFunc("/api/bfit", bfitHandler)
	http.HandleFunc("/api/jwc", jwcHandler)

	port := ":1339"
	fmt.Printf("Starting server on port %s\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		fmt.Printf("Error starting server: %v\n", err)
	}
}
