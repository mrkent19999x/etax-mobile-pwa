// Global setup for eTax Mobile PWA E2E Tests
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

/**
 * Global setup runs before all tests
 * - Verify production URL is accessible
 * - Check Firebase connection
 * - Prepare test data
 */
async function globalSetup(config) {
  console.log('🚀 Starting eTax Mobile PWA E2E Test Setup...');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Test production URL accessibility
    console.log('📡 Testing production URL accessibility...');
    const response = await page.goto('https://anhbao-373f3.web.app', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    if (!response || !response.ok()) {
      throw new Error(`Production URL not accessible: ${response?.status()}`);
    }
    
    console.log('✅ Production URL accessible');
    
    // Test Firebase connection
    console.log('🔥 Testing Firebase connection...');
    await page.goto('https://anhbao-373f3.web.app/login.html', { 
      waitUntil: 'networkidle' 
    });
    
    // Wait for Firebase to load
    await page.waitForFunction(() => {
      return window.firebase && window.firebase.firestore;
    }, { timeout: 10000 });
    
    console.log('✅ Firebase connection verified');
    
    // Create test data directory
    const testDataDir = path.join(__dirname, 'test-results', 'test-data');
    if (!fs.existsSync(testDataDir)) {
      fs.mkdirSync(testDataDir, { recursive: true });
    }
    
    // Generate test MST data
    const testData = {
      mockMST: '9999999999',
      mockPassword: 'firestore123',
      adminCreds: {
        username: 'admin',
        password: 'Baoan2022'
      },
      testTimestamp: new Date().toISOString(),
      baseURL: 'https://anhbao-373f3.web.app'
    };
    
    fs.writeFileSync(
      path.join(testDataDir, 'test-config.json'), 
      JSON.stringify(testData, null, 2)
    );
    
    console.log('✅ Test data prepared');
    console.log('🎯 Setup completed successfully');
    
  } catch (error) {
    console.error('❌ Global setup failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

module.exports = globalSetup;
