// Script to generate PWA icons from SVG
// Run with: node generate-icons.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create simple PNG data URLs for different sizes
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Simple base64 encoded PNG data for a blue square with ₹ symbol
const createIconDataUrl = (size) => {
  // This is a simplified approach - in a real scenario, you'd use a proper image library
  // For now, we'll create simple colored squares
  const canvas = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" rx="${size/8}" fill="#3b82f6"/>
    <text x="${size/2}" y="${size/2 + size/8}" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="${size/4}" font-weight="bold">₹</text>
  </svg>`;
  
  return `data:image/svg+xml;base64,${Buffer.from(canvas).toString('base64')}`;
};

// Generate icon files
sizes.forEach(size => {
  const iconSvg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" rx="${size/8}" fill="url(#gradient)"/>
    <text x="${size/2}" y="${size/2 + size/8}" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="${size/4}" font-weight="bold">₹</text>
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#8b5cf6;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#10b981;stop-opacity:1" />
      </linearGradient>
    </defs>
  </svg>`;
  
  fs.writeFileSync(path.join(__dirname, 'public', `icon-${size}x${size}.svg`), iconSvg);
  console.log(`Generated icon-${size}x${size}.svg`);
});

console.log('Icon generation complete!');
console.log('Note: For production, convert these SVG files to PNG using an image converter.');
