const express = require("express");
const client = require("prom-client");

console.log("==================================");
console.log("Running file:", __filename);
console.log("Node Version:", process.version);
console.log("==================================");

const app = express();
const PORT = 5000;

/*
|--------------------------------------------------------------------------
| Prometheus Metrics
|--------------------------------------------------------------------------
*/

// Collect default Node.js metrics (CPU, Memory, Event Loop, GC, etc.)
client.collectDefaultMetrics();

// Custom Counter
const httpRequestCounter = new client.Counter({
    name: "http_requests_total",
    help: "Total number of HTTP requests",
    labelNames: ["method", "route", "status"]
});

// Custom Histogram
const httpRequestDuration = new client.Histogram({
    name: "http_request_duration_seconds",
    help: "Duration of HTTP requests in seconds",
    labelNames: ["method", "route", "status"],
    buckets: [0.005, 0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5]
});

/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
*/

app.use((req, res, next) => {

    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    // Start request timer
    const end = httpRequestDuration.startTimer();

    // When response finishes, record metrics
    res.on("finish", () => {

        const labels = {
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status: res.statusCode.toString()
        };

        httpRequestCounter.inc(labels);

        end(labels);

    });

    next();
});

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
    res.send("DevSecOps Blog Backend is Running 🚀");
});

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

/*
|--------------------------------------------------------------------------
| Prometheus Metrics Endpoint
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

/*
|--------------------------------------------------------------------------
| Server Events
|--------------------------------------------------------------------------
*/

server.on("listening", () => {
    console.log("Express server is accepting connections.");
});

server.on("error", (err) => {
    console.error("Server Error:", err);
});

/*
|--------------------------------------------------------------------------
| Process Events
|--------------------------------------------------------------------------
*/

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
