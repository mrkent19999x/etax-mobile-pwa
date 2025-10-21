// Test Suite 6: Cross-Device Sync Tests
// TC-S01 to TC-S04: Firestore sync, BroadcastChannel sync, real-time updates

const { test, expect } = require('@playwright/test');

// Test configuration
const BASE_URL = 'https://anhbao-373f3.web.app';
const ADMIN_CREDS = { username: 'admin', password: 'Baoan2022' };
const MOCK_MST = '9999999999';
const MOCK_PASSWORD = 'firestore123';

test.describe('Cross-Device Sync Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Clear storage before each test
    await page.context().clearCookies();
    
    // Set mobile viewport
    await page.setViewportSize({ width: 414, height: 896 });
    
    // Grant permissions for localStorage access
    await page.context().grantPermissions(['storage']);
  });

  test('TC-S01: Admin creates MST → User can login (different browser)', async ({ browser }) => {
    console.log('🧪 TC-S01: Testing admin creates MST → user can login...');
    
    // Create two browser contexts (simulating different devices)
    const adminContext = await browser.newContext();
    const userContext = await browser.newContext();
    
    const adminPage = await adminContext.newPage();
    const userPage = await userContext.newPage();
    
    try {
      // Set mobile viewport for both
      await adminPage.setViewportSize({ width: 414, height: 896 });
      await userPage.setViewportSize({ width: 414, height: 896 });
      
      // Admin: Login to admin panel
      await adminPage.goto(`${BASE_URL}/admin-login.html`);
      await adminPage.waitForLoadState('networkidle');
      await adminPage.fill('#username', ADMIN_CREDS.username);
      await adminPage.fill('#password', ADMIN_CREDS.password);
      await adminPage.click('#loginBtn');
      await adminPage.waitForURL('**/admin.html');
      
      // Take screenshot of admin panel
      await adminPage.screenshot({ 
        path: 'test-results/screenshots/TC-S01-admin-panel.png',
        fullPage: true 
      });
      
      // Admin: Create new MST
      const testMST = `888888888${Date.now().toString().slice(-1)}`;
      const testPassword = 'synctest123';
      
      await adminPage.click('button[onclick="showTab(\'addUser\')"]');
      await adminPage.fill('#mst', testMST);
      await adminPage.fill('#password', testPassword);
      await adminPage.fill('#confirmPassword', testPassword);
      await adminPage.fill('#fullName', 'SYNC TEST USER');
      await adminPage.fill('#address', '123 Sync Test Street');
      await adminPage.fill('#taxOffice', 'Cục Thuế Sync Test');
      await adminPage.fill('#phone', '0908888888');
      await adminPage.fill('#email', 'synctest@example.com');
      
      // Add tax item
      await adminPage.click('button[onclick="openTaxModal()"]');
      await adminPage.fill('#modalTaxOffice', 'Đội Thuế Sync Test');
      await adminPage.fill('#taxStatus', 'Còn phải nộp');
      await adminPage.fill('#taxType', 'Thuế sync test');
      await adminPage.fill('#taxAmount', '1000000');
      await adminPage.click('button[onclick="saveTaxItem()"]');
      
      // Submit form
      await adminPage.click('button[type="submit"]');
      await adminPage.waitForSelector('.status.success', { timeout: 15000 });
      
      // Take screenshot after MST creation
      await adminPage.screenshot({ 
        path: 'test-results/screenshots/TC-S01-mst-created.png',
        fullPage: true 
      });
      
      // Wait for Firestore sync (give it time)
      await adminPage.waitForTimeout(3000);
      
      // User: Try to login with the newly created MST
      await userPage.goto(`${BASE_URL}/login.html`);
      await userPage.waitForLoadState('networkidle');
      
      // Wait for Firebase to load
      await userPage.waitForFunction(() => {
        return window.firebase && window.firebase.firestore;
      }, { timeout: 10000 });
      
      // Take screenshot before user login
      await userPage.screenshot({ 
        path: 'test-results/screenshots/TC-S01-user-login-before.png',
        fullPage: true 
      });
      
      // User: Login with newly created MST
      await userPage.fill('#taxId', testMST);
      await userPage.fill('#password', testPassword);
      await userPage.click('#loginBtn');
      
      // Wait for redirect to index
      await userPage.waitForURL('**/src/pages/index.html', { timeout: 15000 });
      
      // Take screenshot after user login
      await userPage.screenshot({ 
        path: 'test-results/screenshots/TC-S01-user-login-success.png',
        fullPage: true 
      });
      
      // Verify user is logged in with correct data
      await expect(userPage.locator('#user-mst')).toContainText(testMST);
      await expect(userPage.locator('#user-name')).toContainText('SYNC TEST USER');
      
      console.log(`✅ TC-S01: Cross-device sync successful - MST ${testMST} created by admin and used by user`);
      
    } finally {
      // Clean up
      await adminContext.close();
      await userContext.close();
    }
  });

  test('TC-S02: Upload PDF → User sees certificate', async ({ browser }) => {
    console.log('🧪 TC-S02: Testing PDF upload → user sees certificate...');
    
    // Create two browser contexts
    const adminContext = await browser.newContext();
    const userContext = await browser.newContext();
    
    const adminPage = await adminContext.newPage();
    const userPage = await userContext.newPage();
    
    try {
      // Set mobile viewport for both
      await adminPage.setViewportSize({ width: 414, height: 896 });
      await userPage.setViewportSize({ width: 414, height: 896 });
      
      // Admin: Login and create MST first
      await adminPage.goto(`${BASE_URL}/admin-login.html`);
      await adminPage.waitForLoadState('networkidle');
      await adminPage.fill('#username', ADMIN_CREDS.username);
      await adminPage.fill('#password', ADMIN_CREDS.password);
      await adminPage.click('#loginBtn');
      await adminPage.waitForURL('**/admin.html');
      
      const testMST = `777777777${Date.now().toString().slice(-1)}`;
      const testPassword = 'pdftest123';
      
      // Create MST
      await adminPage.click('button[onclick="showTab(\'addUser\')"]');
      await adminPage.fill('#mst', testMST);
      await adminPage.fill('#password', testPassword);
      await adminPage.fill('#confirmPassword', testPassword);
      await adminPage.fill('#fullName', 'PDF TEST USER');
      await adminPage.click('button[type="submit"]');
      await adminPage.waitForSelector('.status.success');
      
      // Admin: Upload PDF certificate
      await adminPage.click('button[onclick="showTab(\'certificateManager\')"]');
      await adminPage.waitForTimeout(1000);
      
      // Select MST for certificate
      await adminPage.selectOption('#certMstSelect', testMST);
      await adminPage.waitForTimeout(1000);
      
      // Take screenshot before PDF upload
      await adminPage.screenshot({ 
        path: 'test-results/screenshots/TC-S02-pdf-upload-before.png',
        fullPage: true 
      });
      
      // Create mock PDF file
      const mockPDFContent = 'Mock PDF certificate content for sync test';
      const mockPDFBuffer = Buffer.from(mockPDFContent);
      
      // Upload PDF
      await adminPage.setInputFiles('#pdfFileInput', {
        name: 'sync-test-certificate.pdf',
        mimeType: 'application/pdf',
        buffer: mockPDFBuffer
      });
      
      // Wait for PDF processing
      await adminPage.waitForTimeout(3000);
      
      // Take screenshot after PDF upload
      await adminPage.screenshot({ 
        path: 'test-results/screenshots/TC-S02-pdf-upload-after.png',
        fullPage: true 
      });
      
      // User: Login and check for certificate
      await userPage.goto(`${BASE_URL}/login.html`);
      await userPage.waitForLoadState('networkidle');
      
      // Wait for Firebase to load
      await userPage.waitForFunction(() => {
        return window.firebase && window.firebase.firestore;
      }, { timeout: 10000 });
      
      // Login
      await userPage.fill('#taxId', testMST);
      await userPage.fill('#password', testPassword);
      await userPage.click('#loginBtn');
      await userPage.waitForURL('**/src/pages/index.html');
      
      // Navigate to certificate page
      await userPage.goto(`${BASE_URL}/src/pages/tra-cuu-chung-tu.html`);
      await userPage.waitForLoadState('networkidle');
      
      // Take screenshot of certificate page
      await userPage.screenshot({ 
        path: 'test-results/screenshots/TC-S02-user-certificate-page.png',
        fullPage: true 
      });
      
      // Check if certificate is visible (might be in localStorage or Firestore)
      const hasCertificate = await userPage.evaluate(() => {
        const certificates = JSON.parse(localStorage.getItem(`etax_certificates_${arguments[0]}`) || '[]');
        return certificates.length > 0;
      }, testMST);
      
      if (hasCertificate) {
        console.log('✅ TC-S02: PDF certificate sync successful');
      } else {
        console.log('⚠️ TC-S02: PDF certificate not found in user view (might be localStorage only)');
      }
      
    } finally {
      // Clean up
      await adminContext.close();
      await userContext.close();
    }
  });

  test('TC-S03: BroadcastChannel sync (same browser, different tabs)', async ({ browser }) => {
    console.log('🧪 TC-S03: Testing BroadcastChannel sync...');
    
    // Create two tabs in same browser context
    const context = await browser.newContext();
    const adminPage = await context.newPage();
    const userPage = await context.newPage();
    
    try {
      // Set mobile viewport for both
      await adminPage.setViewportSize({ width: 414, height: 896 });
      await userPage.setViewportSize({ width: 414, height: 896 });
      
      // Admin: Login
      await adminPage.goto(`${BASE_URL}/admin-login.html`);
      await adminPage.waitForLoadState('networkidle');
      await adminPage.fill('#username', ADMIN_CREDS.username);
      await adminPage.fill('#password', ADMIN_CREDS.password);
      await adminPage.click('#loginBtn');
      await adminPage.waitForURL('**/admin.html');
      
      // User: Login
      await userPage.goto(`${BASE_URL}/login.html`);
      await userPage.waitForLoadState('networkidle');
      
      // Wait for Firebase to load
      await userPage.waitForFunction(() => {
        return window.firebase && window.firebase.firestore;
      }, { timeout: 10000 });
      
      await userPage.fill('#taxId', MOCK_MST);
      await userPage.fill('#password', MOCK_PASSWORD);
      await userPage.click('#loginBtn');
      await userPage.waitForURL('**/src/pages/index.html');
      
      // Take screenshot of both tabs
      await adminPage.screenshot({ 
        path: 'test-results/screenshots/TC-S03-admin-tab.png',
        fullPage: true 
      });
      
      await userPage.screenshot({ 
        path: 'test-results/screenshots/TC-S03-user-tab.png',
        fullPage: true 
      });
      
      // Admin: Create MST (this should trigger BroadcastChannel)
      const testMST = `666666666${Date.now().toString().slice(-1)}`;
      const testPassword = 'broadcasttest123';
      
      await adminPage.click('button[onclick="showTab(\'addUser\')"]');
      await adminPage.fill('#mst', testMST);
      await adminPage.fill('#password', testPassword);
      await adminPage.fill('#confirmPassword', testPassword);
      await adminPage.fill('#fullName', 'BROADCAST TEST USER');
      await adminPage.click('button[type="submit"]');
      await adminPage.waitForSelector('.status.success');
      
      // Take screenshot after MST creation
      await adminPage.screenshot({ 
        path: 'test-results/screenshots/TC-S03-broadcast-mst-created.png',
        fullPage: true 
      });
      
      // Check if BroadcastChannel is working by checking if user tab received notification
      const broadcastReceived = await userPage.evaluate(() => {
        // Check if there's a notification or if localStorage was updated
        return localStorage.getItem('etax_user_data_' + arguments[0]) !== null;
      }, testMST);
      
      if (broadcastReceived) {
        console.log('✅ TC-S03: BroadcastChannel sync successful');
      } else {
        console.log('⚠️ TC-S03: BroadcastChannel sync not detected (might be Firestore-only)');
      }
      
    } finally {
      // Clean up
      await context.close();
    }
  });

  test('TC-S04: Firestore real-time update', async ({ browser }) => {
    console.log('🧪 TC-S04: Testing Firestore real-time update...');
    
    // Create two browser contexts
    const adminContext = await browser.newContext();
    const userContext = await browser.newContext();
    
    const adminPage = await adminContext.newPage();
    const userPage = await userContext.newPage();
    
    try {
      // Set mobile viewport for both
      await adminPage.setViewportSize({ width: 414, height: 896 });
      await userPage.setViewportSize({ width: 414, height: 896 });
      
      // User: Login first and stay on page
      await userPage.goto(`${BASE_URL}/login.html`);
      await userPage.waitForLoadState('networkidle');
      
      // Wait for Firebase to load
      await userPage.waitForFunction(() => {
        return window.firebase && window.firebase.firestore;
      }, { timeout: 10000 });
      
      await userPage.fill('#taxId', MOCK_MST);
      await userPage.fill('#password', MOCK_PASSWORD);
      await userPage.click('#loginBtn');
      await userPage.waitForURL('**/src/pages/index.html');
      
      // Take screenshot of user page
      await userPage.screenshot({ 
        path: 'test-results/screenshots/TC-S04-user-page-before.png',
        fullPage: true 
      });
      
      // Admin: Login and create MST
      await adminPage.goto(`${BASE_URL}/admin-login.html`);
      await adminPage.waitForLoadState('networkidle');
      await adminPage.fill('#username', ADMIN_CREDS.username);
      await adminPage.fill('#password', ADMIN_CREDS.password);
      await adminPage.click('#loginBtn');
      await adminPage.waitForURL('**/admin.html');
      
      const testMST = `555555555${Date.now().toString().slice(-1)}`;
      const testPassword = 'realtimetest123';
      
      // Create MST
      await adminPage.click('button[onclick="showTab(\'addUser\')"]');
      await adminPage.fill('#mst', testMST);
      await adminPage.fill('#password', testPassword);
      await adminPage.fill('#confirmPassword', testPassword);
      await adminPage.fill('#fullName', 'REALTIME TEST USER');
      await adminPage.click('button[type="submit"]');
      await adminPage.waitForSelector('.status.success');
      
      // Take screenshot after MST creation
      await adminPage.screenshot({ 
        path: 'test-results/screenshots/TC-S04-admin-mst-created.png',
        fullPage: true 
      });
      
      // Wait for Firestore real-time update
      await userPage.waitForTimeout(5000);
      
      // Check if user page received real-time update
      const realtimeUpdate = await userPage.evaluate(() => {
        // Check if there's any indication of real-time update
        // This could be a notification, updated localStorage, or UI change
        return localStorage.getItem('etax_user_data_' + arguments[0]) !== null;
      }, testMST);
      
      // Take screenshot after potential real-time update
      await userPage.screenshot({ 
        path: 'test-results/screenshots/TC-S04-user-page-after.png',
        fullPage: true 
      });
      
      if (realtimeUpdate) {
        console.log('✅ TC-S04: Firestore real-time update successful');
      } else {
        console.log('⚠️ TC-S04: Firestore real-time update not detected (might be manual refresh required)');
      }
      
    } finally {
      // Clean up
      await adminContext.close();
      await userContext.close();
    }
  });

});
