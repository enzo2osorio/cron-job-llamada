require("dotenv").config();
const https = require("https");

console.log("🚀 Cron job iniciado");

const url = process.env.MI_API_URL;
if (!url) {
  console.error("❌ MI_API_URL no está definido");
  process.exit(1);
}

console.log("🌐 URL a pingear:", url);

https
  .get(url, (res) => {
    console.log(`✅ Ping exitoso: ${res.statusCode}`);
    process.exit(0); // <-- importante para que el proceso termine
  })
  .on("error", (err) => {
    console.error("❌ Error en el ping:", err.message);
    process.exit(1);
  });