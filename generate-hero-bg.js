const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set viewport size for the image
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });

    // Get the absolute path to the HTML template
    const templatePath = path.join(__dirname, 'hero-bg-template.html');
    console.log(`Loading template from: ${templatePath}`);
    
    // Check if the file exists
    if (!fs.existsSync(templatePath)) {
      console.error('Template file does not exist!');
      await browser.close();
      return;
    }

    // Load the HTML template
    await page.goto(`file://${templatePath}`);
    console.log('Template loaded, waiting for fonts...');

    // Wait for fonts to load
    await page.waitForTimeout(1000);

    // Take screenshot
    const imagePath = path.join(__dirname, 'images', 'hero-bg.jpg');
    console.log(`Saving screenshot to: ${imagePath}`);
    await page.screenshot({ path: imagePath, type: 'jpeg', quality: 90 });

    await browser.close();
    console.log('Done! Hero background image created successfully.');
  } catch (error) {
    console.error('Error generating image:', error);
    process.exit(1);
  }
})(); 