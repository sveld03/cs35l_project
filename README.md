# cs35l_project
The purpose of “Healthy on the Hill” is to enhance the experience of people living on the hill, designed to improve health and ease of connection within their busy UCLA schedules. It will 1) help users achieve their fitness goals by allowing them to connect with gym buddies based on goals and fitness levels. It will also 2) help students create a fitness plan by recommending machines based on their preferences. Additionally, the application will 3) have information about live food options on the Hill, including ratings of individual meals. Finally, 4) students will be able to see how busy each dining hall and gym is throughout the day.

# List of Dependencies

## JavaScript/Node.js Dependencies:
bcryptjs
body-parser
cors
dotenv
express
jsonwebtoken
mongodb
mongoose
@emotion/react
@emotion/styled
@fontsource/roboto
@mui/icons-material
@mui/material
@testing-library/jest-dom
@testing-library/react
@testing-library/user-event
react-router-dom
typewriter-effect
web-vitals

## Go Dependencies:
github.com/PuerkitoBio/goquery
github.com/andybalholm/cascadia
github.com/gorilla/mux
github.com/joho/godotenv
golang.org/x/net



# How to run the project (instead of using ./start)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sveld03/cs35l_project.git
   ```
2. **Install dependencies**
    ```bash
    cd healthyonthehill
    npm install
    cd backend
    npm install
    ```
3. [If Go isn't installed on your machine, install here](https://go.dev/doc/install)
4. **Run Activity Level API with Go**
    ```bash
    cd api/bruingym-activity-level
    go run .
    ```
5. **Run Dining Hall API with Go**
   ```bash
    cd api/dining
    go run .
    ```
6. **Run Node.js backend**
   ```bash
    cd backend
    node index.js
    ```
7. **Start up React** 
    ```bash
    cd healthyonthehill
    npm start
    ```
