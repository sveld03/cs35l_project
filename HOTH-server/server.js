const express = require("express");
const User = require("./model/user.js");
require("dotenv").config();
mongoose = require("mongoose");
const users = require("./routes/users.js") // to get routes

const app = express();


// any data we send to server accessible in req.body
app.use(express.json())

// logging the http requests made for debugging
app.use((req, res, next) => {
  console.log(req.path, req.method) 
  next()
})

app.use("/api/users", users)


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
