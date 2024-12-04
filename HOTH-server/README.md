# Healthy on the Hill Backend

## Server

* Access the server on http:/localhost:4000/

## Currently Supported API Routes

Auth Routes
* POST http://localhost:4000/api/users/auth/register
* POST http://localhost:4000/api/users/auth/registerAll
* POST http://localhost:4000/api/users/auth/login
* POST http://localhost:4000/api/users/auth/verifyUser

Gym Buddy Routes
* PATCH http://localhost:4000/api/gymBuddy/update
* GET http://localhost:4000/api/gymBuddy/getProfile
* PATCH http://localhost:4000/api/gymBuddy/match
* PATCH http://localhost:4000/api/gymBuddy/like/:id
* PATCH http://localhost:4000/api/gymBuddy/dislike/:id
* GET http://localhost:4000/api/gymBuddy/getMyBuddies
* GET http://localhost:4000/api/gymBuddy/getNotifications

Dining Rating Routes
* GET http://localhost:4000/api/rating/getUserRating/:diningHall
* PATCH http://localhost:4000/api/rating/updateUserRating/:diningHall
* GET http://localhost:4000/api/rating/getDiningHallRating/:diningHall
* GET http://localhost:4000/api/rating/getDiningHallComments/:diningHall

General User Routes (no auth required; to easily alter db during dev)
* GET http://localhost:4000/api/users/
* GET http://localhost:4000/api/users/:id
* POST http://localhost:4000/api/users/createUser
* POST http://localhost:4000/api/users/createUsers
* PATCH http://localhost:4000/api/users/patch/:id


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
    npm run dev
    ```
## Tech Stack
* Node.js
* Express.js
* Javascript
* MongoDB
* jsonwebtoken (JWT auth implementation library)



## Contributors
Ananya Anand

