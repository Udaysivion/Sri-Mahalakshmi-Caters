const https = require('https');

const urls = [
  "https://images.unsplash.com/photo-1414235077428-33898bd12285?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1544025162-83138b30bc06?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1530103862676-de8892bf309c?auto=format&fit=crop&q=80&w=2000"
];

async function checkUrls() {
  for (const urlStr of urls) {
    try {
      const parsedUrl = new URL(urlStr);
      await new Promise((resolve) => {
        const req = https.request({
          hostname: parsedUrl.hostname,
          path: parsedUrl.pathname + parsedUrl.search,
          method: 'HEAD'
        }, (res) => {
          console.log(`[${res.statusCode}] ${urlStr}`);
          resolve();
        });
        req.on('error', (e) => {
          console.log(`[ERROR] ${urlStr}: ${e.message}`);
          resolve();
        });
        req.end();
      });
    } catch(e) {
      console.log(`[BAD URL] ${urlStr}`);
    }
  }
}

checkUrls();
