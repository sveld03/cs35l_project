# Healthy on the Hill

Healthy on the Hill is a web application designed to improve the health and ease of connection for UCLA students living on the Hill. It provides tools to:
	1.	Connect gym buddies based on fitness goals and levels.
	2.	Create personalized fitness plans by recommending gym equipment.
	3.	View live food options on the Hill with meal ratings.
	4.	Check live activity levels of dining halls and gyms.

## Dependencies

JavaScript/Node.js

	•	bcryptjs
	•	body-parser
	•	cors
	•	dotenv
	•	express
	•	jsonwebtoken
	•	mongodb
	•	mongoose
	•	@emotion/react
	•	@emotion/styled
	•	@fontsource/roboto
	•	@mui/icons-material
	•	@mui/material
	•	@testing-library/jest-dom
	•	@testing-library/react
	•	@testing-library/user-event
	•	react-router-dom
	•	typewriter-effect
	•	web-vitals

Go

	•	github.com/PuerkitoBio/goquery
	•	github.com/andybalholm/cascadia
	•	github.com/gorilla/mux
	•	github.com/joho/godotenv
	•	golang.org/x/net

## Quick Start

To streamline the setup, two bash scripts are provided for installing dependencies and starting the application.

1. Clone the Repository

git clone https://github.com/sveld03/cs35l_project.git

2. Install Dependencies

Run the provided installation script to check for Golang and install Node.js dependencies:

bash install

This script performs the following:
	•	Verifies if Golang is installed.
	•	Installs Node.js dependencies in both the healthyonthehill and backend directories concurrently.

3. Start the Application

Run the startup script to launch all services:

bash start

This script performs the following:
	•	Starts the React frontend.
	•	Launches the two Go servers for gym activity and dining hall APIs.
	•	Starts the Node.js backend for user authentication.

4. Access the Application

Once all servers are running, open your browser and navigate to:

http://localhost:3000

## Project Structure

	•	Frontend: A React-based user interface that displays the app and user data.
	•	Backend: A Node.js/Express server for handling authentication, user data, and app logic.
	•	APIs: Go APIs for live gym activity and dining hall information.

Enjoy staying Healthy on the Hill! 🌟