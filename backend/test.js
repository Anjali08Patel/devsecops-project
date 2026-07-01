const client = require("prom-client");

client.collectDefaultMetrics();

(async () => {
    console.log("Before metrics()");
    const metrics = await client.register.metrics();
    console.log("After metrics()");
    console.log(metrics.substring(0, 300));
})();
