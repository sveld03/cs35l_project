//server.js

const express = require("express");
const User = require("./model/user.js");
require("dotenv").config();
mongoose = require("mongoose");
const usersAuth = require("./routes/authRoutes.js") // to get auth routes
const users = require("./routes/userRoutes.js") // to get general user routes
const gymBuddy = require("./routes/gymBuddyRoutes.js")

// add routers to call dining and GymBuddy controllers later

const app = express();


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


// connecting to mongodb atlas db
mongoose
  .connect(process.env.URI)
  .then(
    app.listen(process.env.PORT, () => {
      console.log(
        "connected to db & listening for requests on port",
        process.env.PORT
      );
    })
  )
  .catch((err) => console.log(err));
