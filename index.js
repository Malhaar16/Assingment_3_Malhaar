require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const upload_router = require("./router/upload_router");
const fetch_router = require("./router/fetch_router");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to MongoDB");
});
db.on("error", (err) => {
  console.error("DB Error:" + err);
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/upload", upload_router);
app.use("/fetch", fetch_router);

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get("/fetch-random", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/fetch-random.html"));
});

app.get("/fetch-multiple-random", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/fetch-multiple-random.html"));
});

app.get("/gallery", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "gallery.html"));
});

// Serve gallery-pagination.html
app.get("/gallery-pagination", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "gallery-pagination.html"));
});

// Handle 404
app.use((req, res) => {
  res.status(404).send("Route does not exist on our server");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
