// db.js
const mongoose = require('mongoose');

// Connection URI
const mongoURI = 'mongodb://localhost:27017/gymBuddy';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Export the connection
module.exports = mongoose;
