const express = require("express");

const app = express();

// health check endpoint
app.get("/", (req, res) => {
  res.send("DevSecOps Blog Backend is Running 🚀");
});

// simple API endpoint
app.get("/api", (req, res) => {
  res.json({
    project: "DevSecOps Blog Platform",
    status: "running",
    tools: [
      "Docker",
      "Jenkins",
      "Terraform",
      "Kubernetes",
      "SonarQube"
    ]
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
