const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests (needed if frontend calls backend on a different domain)
app.use(express.json());

// Serve static frontend files (index.html, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Optional: Proxy API requests to your backend
// This assumes your backend is deployed somewhere (Railway URL, for example)
const API_BASE_URL = process.env.BACKEND_URL || "https://your-backend-on-railway.up.railway.app";

app.use("/api", (req, res) => {
const fetch = require("node-fetch"); // install with npm install node-fetch
const url = API_BASE_URL + req.url;

req.pipe(fetch(url, {
    method: req.method,
    headers: { "Content-Type": "application/json" },
    body: ["GET", "HEAD"].includes(req.method) ? null : JSON.stringify(req.body)
}).then(response => response.body))
.pipe(res);

});

// Fallback: serve index.html for SPA routing (React, Vue, etc.)
app.get("*", (req, res) => {
res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () => {
console.log(`Frontend server running on port ${PORT}`);
});