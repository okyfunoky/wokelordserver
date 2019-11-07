const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 3001;

const allRoutes = require('./controllers');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
  origin:["https://okyfunoky.github.io/wokelordclient"],
  credentials:true
}));

// Static directory
// app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));


app.use('/', allRoutes);
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/wokelord");

// Start the API server
app.listen(PORT, function() {
  console.log(`http://localhost:${PORT}!`);
});