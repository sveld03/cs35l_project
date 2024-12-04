//server.js

const express = require("express");
const cors = require("cors");  // Import CORS
const User = require("./model/user.js");
require("dotenv").config();
mongoose = require("mongoose");
const usersAuth = require("./routes/authRoutes.js") // to get auth routes
const users = require("./routes/userRoutes.js") // to get general user routes
const bodyParser = require("body-parser");

const gymBuddy = require("./routes/gymBuddyRoutes.js") // to get gymbuddy routes
const ratings = require("./routes/diningRoutes.js") // to get rating routes
const cors = require('cors');


// add routers to call dining and GymBuddy controllers later

const app = express();

app.use(cors());

// any data we send to server accessible in req.body
app.use(express.json())

// logging the http requests made for debugging
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use("/api/users", users)
app.use("/api/gymBuddy", gymBuddy)
app.use("/api/users/auth", usersAuth)
app.use("/api/users/ratings", ratings)

// connecting to mongodb atlas db
mongoose
  .connect(process.env.URI, {
    serverSelectionTimeoutMS: 30000, // time to conenct to server
    socketTimeoutMS: 45000,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }) // time to wait for response from server
  .then(
    app.listen(process.env.PORT, () => {
      console.log(
        "connected to db & listening for requests on port",
        process.env.PORT
      );
    })
  )
  .catch((err) => console.log(err));
