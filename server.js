const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Middleware for parsing JSON requests
app.use(express.json());

// Add any API routes here if needed, e.g., for frontend fetch requests
// Example:
// app.get("/api/hello", (req, res) => {
//   res.json({ message: "Hello from frontend server!" });
// });

// Fallback route for SPA (single-page application) to serve index.html
app.get("*", (req, res) => {
res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(PORT, () => {
console.log(`Frontend server running on port ${PORT}`);
});
