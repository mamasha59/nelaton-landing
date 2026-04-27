import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(__dirname, "..", "public", "icons");

// Создаем простые SVG иконки
sizes.forEach((size) => {
  const radius = Math.floor(size * 0.15);
  const fontSize = Math.floor(size * 0.4);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4baa7a;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#5ec4a0;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#3b8a6a;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${radius}" fill="url(#grad)"/>
  <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" 
        font-family="Arial, Helvetica, sans-serif" 
        font-size="${fontSize}" 
        fill="white" 
        font-weight="bold">N</text>
</svg>`;

  fs.writeFileSync(path.join(iconsDir, `icon-${size}x${size}.png`), svg);

  console.log(`Created icon-${size}x${size}.png`);
});

console.log("\n✅ SVG иконки созданы!");
console.log("⚠️  Для production конвертируйте SVG в PNG через:");
console.log("   - https://cloudconvert.com/svg-to-png");
console.log("   - https://svgtopng.com/");
console.log("   - или используйте sharp/imagemagick локально\n");
