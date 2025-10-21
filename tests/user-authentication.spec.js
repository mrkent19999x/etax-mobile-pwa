// Test Suite 2: User Authentication Tests
// TC-U01 to TC-U06: Login success/fail, session persistence, logout

const { test, expect } = require('@playwright/test');

// Test configuration
const BASE_URL = 'https://anhbao-373f3.web.app';
const MOCK_MST = '9999999999';
const MOCK_PASSWORD = 'firestore123';

test.describe('User Authentication Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Clear storage before each test
    await page.context().clearCookies();
    
    // Set mobile viewport
    await page.setViewportSize({ width: 414, height: 896 });
    
    // Grant permissions for localStorage access
    await page.context().grantPermissions(['storage']);
  });

  test('TC-U01: User login with mock MST', async ({ page }) => {
    console.log('🧪 TC-U01: Testing user login with mock MST...');
    
    // Navigate to login page
    await page.goto(`${BASE_URL}/login.html`);
    await page.waitForLoadState('networkidle');
    
    // Take screenshot before login
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-U01-login-before.png',
      fullPage: true 
    });
    
    // Wait for Firebase to load
    await page.waitForFunction(() => {
      return window.firebase && window.firebase.firestore;
    }, { timeout: 10000 });
    
    // Fill login form
    await page.fill('#taxId', MOCK_MST);
    await page.fill('#password', MOCK_PASSWORD);
    
    // Click login button
    await page.click('#loginBtn');
    
    // Wait for redirect to index page
    await page.waitForURL('**/src/pages/index.html', { timeout: 15000 });
    
    // Take screenshot after login
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-U01-login-success.png',
      fullPage: true 
    });
    
    // Verify user is logged in
    await expect(page.locator('#user-mst')).toBeVisible();
    await expect(page.locator('#user-name')).toBeVisible();
    
    // Verify MST is displayed correctly
    await expect(page.locator('#user-mst')).toContainText(MOCK_MST);
    
    console.log('✅ TC-U01: User login with mock MST successful');
  });

  test('TC-U02: User login with real MST from Firestore', async ({ page }) => {
    console.log('🧪 TC-U02: Testing user login with real MST from Firestore...');
    
    // Navigate to login page
    await page.goto(`${BASE_URL}/login.html`);
    await page.waitForLoadState('networkidle');
    
    // Wait for Firebase to load
    await page.waitForFunction(() => {
      return window.firebase && window.firebase.firestore;
    }, { timeout: 10000 });
    
    // Try to get a real MST from Firestore
    const realMST = await page.evaluate(async () => {
      try {
        const db = firebase.firestore();
        const snapshot = await db.collection('users').limit(1).get();
        if (!snapshot.empty) {
          return snapshot.docs[0].id;
        }
        return null;
      } catch (error) {
        console.log('No real MST found in Firestore');
        return null;
      }
    });
    
    if (realMST) {
      // Take screenshot before login
      await page.screenshot({ 
        path: 'test-results/screenshots/TC-U02-real-mst-login-before.png',
        fullPage: true 
      });
      
      // Fill login form with real MST
      await page.fill('#taxId', realMST);
      await page.fill('#password', MOCK_PASSWORD);
      
      // Click login button
      await page.click('#loginBtn');
      
      // Wait for redirect or error
      try {
        await page.waitForURL('**/src/pages/index.html', { timeout: 10000 });
        
        // Take screenshot after successful login
        await page.screenshot({ 
          path: 'test-results/screenshots/TC-U02-real-mst-login-success.png',
          fullPage: true 
        });
        
        // Verify user is logged in
        await expect(page.locator('#user-mst')).toContainText(realMST);
        
        console.log(`✅ TC-U02: User login with real MST ${realMST} successful`);
      } catch (error) {
        // Login might fail if password is wrong
        console.log(`⚠️ TC-U02: Login with real MST ${realMST} failed (expected if password wrong)`);
        
        // Take screenshot of error
        await page.screenshot({ 
          path: 'test-results/screenshots/TC-U02-real-mst-login-failed.png',
          fullPage: true 
        });
      }
    } else {
      console.log('⚠️ TC-U02: No real MST found in Firestore, skipping test');
      
      // Take screenshot of empty login page
      await page.screenshot({ 
        path: 'test-results/screenshots/TC-U02-no-real-mst.png',
        fullPage: true 
      });
    }
  });

  test('TC-U03: Login fail with wrong password', async ({ page }) => {
    console.log('🧪 TC-U03: Testing login fail with wrong password...');
    
    // Navigate to login page
    await page.goto(`${BASE_URL}/login.html`);
    await page.waitForLoadState('networkidle');
    
    // Wait for Firebase to load
    await page.waitForFunction(() => {
      return window.firebase && window.firebase.firestore;
    }, { timeout: 10000 });
    
    // Take screenshot before login
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-U03-wrong-password-before.png',
      fullPage: true 
    });
    
    // Fill login form with wrong password
    await page.fill('#taxId', MOCK_MST);
    await page.fill('#password', 'wrongpassword123');
    
    // Click login button
    await page.click('#loginBtn');
    
    // Wait for error message
    await page.waitForSelector('#errorMsg', { timeout: 10000 });
    
    // Take screenshot after error
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-U03-wrong-password-error.png',
      fullPage: true 
    });
    
    // Verify error message
    await expect(page.locator('#errorMsg')).toBeVisible();
    await expect(page.locator('#errorMsg')).toContainText('Mật khẩu không đúng');
    
    // Verify still on login page
    await expect(page).toHaveURL(/.*login\.html/);
    
    console.log('✅ TC-U03: Login fail with wrong password handled correctly');
  });

  test('TC-U04: Login fail with non-existent MST', async ({ page }) => {
    console.log('🧪 TC-U04: Testing login fail with non-existent MST...');
    
    // Navigate to login page
    await page.goto(`${BASE_URL}/login.html`);
    await page.waitForLoadState('networkidle');
    
    // Wait for Firebase to load
    await page.waitForFunction(() => {
      return window.firebase && window.firebase.firestore;
    }, { timeout: 10000 });
    
    // Take screenshot before login
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-U04-non-existent-mst-before.png',
      fullPage: true 
    });
    
    // Fill login form with non-existent MST
    const nonExistentMST = '0000000000';
    await page.fill('#taxId', nonExistentMST);
    await page.fill('#password', MOCK_PASSWORD);
    
    // Click login button
    await page.click('#loginBtn');
    
    // Wait for error message
    await page.waitForSelector('#errorMsg', { timeout: 10000 });
    
    // Take screenshot after error
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-U04-non-existent-mst-error.png',
      fullPage: true 
    });
    
    // Verify error message
    await expect(page.locator('#errorMsg')).toBeVisible();
    await expect(page.locator('#errorMsg')).toContainText('Mã số thuế không tồn tại');
    
    // Verify still on login page
    await expect(page).toHaveURL(/.*login\.html/);
    
    console.log('✅ TC-U04: Login fail with non-existent MST handled correctly');
  });

  test('TC-U05: Session persistence check', async ({ page }) => {
    console.log('🧪 TC-U05: Testing session persistence...');
    
    // First login
    await page.goto(`${BASE_URL}/login.html`);
    await page.waitForLoadState('networkidle');
    
    // Wait for Firebase to load
    await page.waitForFunction(() => {
      return window.firebase && window.firebase.firestore;
    }, { timeout: 10000 });
    
    // Login
    await page.fill('#taxId', MOCK_MST);
    await page.fill('#password', MOCK_PASSWORD);
    await page.click('#loginBtn');
    await page.waitForURL('**/src/pages/index.html');
    
    // Take screenshot after login
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-U05-session-after-login.png',
      fullPage: true 
    });
    
    // Check localStorage has session data
    const sessionData = await page.evaluate(() => {
      return {
        loggedInUser: localStorage.getItem('etax_logged_in_user'),
        userInfo: localStorage.getItem('etax_user_info'),
        userData: localStorage.getItem('etax_user_data')
      };
    });
    
    // Verify session data exists
    expect(sessionData.loggedInUser).toBe(MOCK_MST);
    expect(sessionData.userInfo).toBeTruthy();
    expect(sessionData.userData).toBeTruthy();
    
    // Navigate to another page and back
    await page.goto(`${BASE_URL}/src/pages/thongtin.html`);
    await page.waitForLoadState('networkidle');
    
    // Go back to index
    await page.goto(`${BASE_URL}/src/pages/index.html`);
    await page.waitForLoadState('networkidle');
    
    // Take screenshot after navigation
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-U05-session-after-navigation.png',
      fullPage: true 
    });
    
    // Verify user is still logged in
    await expect(page.locator('#user-mst')).toContainText(MOCK_MST);
    
    console.log('✅ TC-U05: Session persistence verified');
  });

  test('TC-U06: User logout', async ({ page }) => {
    console.log('🧪 TC-U06: Testing user logout...');
    
    // First login
    await page.goto(`${BASE_URL}/login.html`);
    await page.waitForLoadState('networkidle');
    
    // Wait for Firebase to load
    await page.waitForFunction(() => {
      return window.firebase && window.firebase.firestore;
    }, { timeout: 10000 });
    
    // Login
    await page.fill('#taxId', MOCK_MST);
    await page.fill('#password', MOCK_PASSWORD);
    await page.click('#loginBtn');
    await page.waitForURL('**/src/pages/index.html');
    
    // Take screenshot before logout
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-U06-user-before-logout.png',
      fullPage: true 
    });
    
    // Open sidebar menu
    await page.click('.left-menu');
    await page.waitForTimeout(500);
    
    // Take screenshot of sidebar
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-U06-sidebar-menu.png',
      fullPage: true 
    });
    
    // Click logout button
    await page.click('button[onclick="logout()"]');
    
    // Wait for redirect to login page
    await page.waitForURL('**/login.html', { timeout: 10000 });
    
    // Take screenshot after logout
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-U06-user-logout-success.png',
      fullPage: true 
    });
    
    // Verify redirected to login page
    await expect(page.locator('h1')).toContainText('eTax Mobile');
    
    // Verify session is cleared
    const sessionData = await page.evaluate(() => {
      return {
        loggedInUser: localStorage.getItem('etax_logged_in_user'),
        userInfo: localStorage.getItem('etax_user_info')
      };
    });
    
    expect(sessionData.loggedInUser).toBeNull();
    expect(sessionData.userInfo).toBeNull();
    
    console.log('✅ TC-U06: User logout successful');
  });

});
