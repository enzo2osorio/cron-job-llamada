require("dotenv").config();
const http = require("http");
const https = require("https");

console.log("🚀 Cron job iniciado");

const urls = [process.env.MI_API_URL, process.env.MI_API_URL_2];

function ping(url) {
  return new Promise((resolve) => {
    const client = url.startsWith("https") ? https : http;

    const req = client.get(url, (res) => {
      console.log(`✔ Ping ${url} → ${res.statusCode}`);
      res.resume(); // <--- IMPORTANTE: consume data y cierra conexión
      resolve();
    });

    req.on("error", (err) => {
      console.log(`❌ Error ping ${url}:`, err.message);
      resolve(); // <-- No bloqueo
    });

    req.setTimeout(5000, () => {
      console.log(`⏱ Timeout ping ${url}`);
      req.destroy();
      resolve();
    });
  });
}

async function main() {
  for (const url of urls) {
    if (url) await ping(url);
  }
  process.exit(0);
}

main();
