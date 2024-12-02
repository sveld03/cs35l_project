# Healthy on the Hill Backend

## Server

* Access the server on http:/localhost:4000/

## Currently Tested API Routes
Auth Routes
* POST http://localhost:4000/api/users/auth/register
* POST http://localhost:4000/api/users/auth/registerAll
* POST http://localhost:4000/api/users/auth/login
* POST http://localhost:4000/api/users/auth/verifyUser

Gym Buddy Routes
* PATCH http://localhost:4000/api/gymBuddy/update
* GET http://localhost:4000/api/gymBuddy/getProfile
* PATCH http://localhost:4000/api/gymBuddy/match


User Routes (for testing)
* GET http://localhost:4000/api/users/
* POST http://localhost:4000/api/users/createUser
* POST http://localhost:4000/api/users/createUsers

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sveld03/cs35l_project.git
   cd HOTH-server
   ```
2. **Install dependencies**
    ```bash
    npm install
    ```
3. **Run the Application**
    ```bash
    node server.js
    ```
## Tech Stack
* Node.js
* Express.js
* Javascript
* MongoDB
* jsonwebtoken (JWT auth implementation library)



## Contributors
Ananya Anand

