require("dotenv").config();
const http = require("http");
const https = require("https");

console.log("🚀 Cron job iniciado");

const url = process.env.MI_API_URL;
const url_2 = process.env.MI_API_URL_2;

if (!url) {
  console.error("❌ MI_API_URL no está definido");
  process.exit(1);
}

console.log("🌐 URL a pingear:", url);

function ping(url) {
  const client = url.startsWith("https") ? https : http;

  client
    .get(url, (res) => {
      console.log(`✅ Ping exitoso: ${res.statusCode}`);
    })
    .on("error", (err) => {
      console.error("❌ Error en el ping:", err.message);
    });
}

ping(url);
ping(url_2);
