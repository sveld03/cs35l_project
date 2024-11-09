# Gym Buddy Finder

This project helps users find gym buddies based on their preferences and fitness goals.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed [Node.js](https://nodejs.org/en/download/) (version 14 or higher).
- You have installed [MongoDB](https://www.mongodb.com/try/download/community) and have it running on your local machine.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sveld03/cs35l_project.git
   cd gymBuddyServer
   ```
2. **Install dependencies**
    ```bash
    npm install
    ```
3. **Run the Application**
    node app.js
4. **Connect to local mongoDB instance**
    Connect to mongoDB using mongosh:
    ```bash
    mongosh
    ```
    Switch to the gymBuddyDB database:
    ```bash
    use gymBuddyServer
    ```
5. **View User Data**   
    db.users.find().pretty()

## Created By
Ananya Anand


