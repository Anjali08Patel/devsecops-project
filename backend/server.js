const express = require("express");
const client = require("prom-client");

console.log("==================================");
console.log("Running file:", __filename);
console.log("Node Version:", process.version);
console.log("==================================");

const app = express();
const PORT = 5000;

// Collect default Node.js metrics
client.collectDefaultMetrics();

// Middleware to log every request
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Root endpoint
app.get("/", (req, res) => {
    res.send("DevSecOps Blog Backend is Running 🚀");
});

// API endpoint
app.get("/api", (req, res) => {
    res.json({
        project: "DevSecOps Blog Platform",
        status: "running",
        tools: [
            "Docker",
            "Jenkins",
            "Terraform",
            "Kubernetes",
            "SonarQube",
            "Prometheus",
            "Grafana"
        ]
    });
});

// Prometheus metrics endpoint
app.get("/metrics", async (req, res) => {
    try {
        res.set("Content-Type", client.register.contentType);
        const metrics = await client.register.metrics();
        res.end(metrics);
    } catch (err) {
        console.error("Metrics Error:", err);
        res.status(500).end(err.message);
    }
});

// Start server
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// Server events
server.on("listening", () => {
    console.log("Express server is accepting connections.");
});

server.on("error", (err) => {
    console.error("Server Error:", err);
});

// Process events
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason);
});

process.on("SIGINT", () => {
    console.log("Received SIGINT. Shutting down...");
    server.close(() => {
        console.log("Server stopped.");
        process.exit(0);
    });
});
