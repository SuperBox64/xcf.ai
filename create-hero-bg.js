const fs = require('fs');
const { createCanvas } = require('canvas');

// This script requires the 'canvas' package
// If not installed, run: npm install canvas

try {
  console.log('Creating canvas...');
  
  // Create a canvas for the background
  const width = 1920;
  const height = 1080;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#0056cc');
  gradient.addColorStop(1, '#006eff');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Add text "XCodeFreeze"
  ctx.font = 'bold 150px Helvetica, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Draw semi-transparent text
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.fillText('XCodeFreeze', width / 2, height / 2);
  
  // Save the image
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync('./images/hero-bg.jpg', buffer);
  
  console.log('Hero background image created successfully!');
} catch (error) {
  console.error('Error:', error.message);
  console.log('If the "canvas" package is not installed, please run:');
  console.log('npm install canvas');
} 