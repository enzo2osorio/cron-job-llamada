const https = require("https");
const dotenv = require("dotenv");
dotenv.config();

https.get(process.env.MI_API_URL, res => {
  console.log(`Ping status: ${res.statusCode}`);
}).on("error", err => {
  console.error("Ping error:", err.message);
});