const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist");
// Start the API server
app.listen(PORT, function () {
    console.log(`http://localhost:${PORT}!`);
});
//# sourceMappingURL=server.js.map