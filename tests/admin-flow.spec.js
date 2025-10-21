// Test Suite 1: Admin Flow Tests
// TC-A01 to TC-A08: Admin login, dashboard, create MST, upload PDF, logout

const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Test configuration
const BASE_URL = 'https://anhbao-373f3.web.app';
const ADMIN_CREDS = { username: 'admin', password: 'Baoan2022' };

test.describe('Admin Flow Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Clear storage before each test
    await page.context().clearCookies();
    
    // Set mobile viewport
    await page.setViewportSize({ width: 414, height: 896 });
    
    // Grant permissions for localStorage access
    await page.context().grantPermissions(['storage']);
  });

  test('TC-A01: Admin login successful', async ({ page }) => {
    console.log('🧪 TC-A01: Testing admin login...');
    
    // Navigate to admin login page
    await page.goto(`${BASE_URL}/admin-login.html`);
    await page.waitForLoadState('networkidle');
    
    // Take screenshot before login
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-A01-admin-login-before.png',
      fullPage: true 
    });
    
    // Fill login form
    await page.fill('#username', ADMIN_CREDS.username);
    await page.fill('#password', ADMIN_CREDS.password);
    
    // Click login button
    await page.click('#loginBtn');
    
    // Wait for redirect to admin panel
    await page.waitForURL('**/admin.html', { timeout: 10000 });
    
    // Verify admin panel loaded
    await expect(page.locator('h1')).toContainText('Admin Quản lý MST');
    
    // Take screenshot after login
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-A01-admin-login-success.png',
      fullPage: true 
    });
    
    console.log('✅ TC-A01: Admin login successful');
  });

  test('TC-A02: Admin dashboard statistics display', async ({ page }) => {
    console.log('🧪 TC-A02: Testing admin dashboard...');
    
    // Login first
    await page.goto(`${BASE_URL}/admin-login.html`);
    await page.fill('#username', ADMIN_CREDS.username);
    await page.fill('#password', ADMIN_CREDS.password);
    await page.click('#loginBtn');
    await page.waitForURL('**/admin.html');
    
    // Take screenshot of dashboard
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-A02-admin-dashboard.png',
      fullPage: true 
    });
    
    // Verify dashboard elements
    await expect(page.locator('#totalUsers')).toBeVisible();
    await expect(page.locator('#totalTaxAmount')).toBeVisible();
    await expect(page.locator('#pendingAmount')).toBeVisible();
    
    // Verify tab navigation
    await expect(page.locator('.tab-button.active')).toContainText('Dashboard');
    
    // Verify quick actions
    await expect(page.locator('.action-card')).toHaveCount(4);
    
    console.log('✅ TC-A02: Admin dashboard displayed correctly');
  });

  test('TC-A03: Create new MST with full tax info', async ({ page }) => {
    console.log('🧪 TC-A03: Testing create new MST...');
    
    // Login first
    await page.goto(`${BASE_URL}/admin-login.html`);
    await page.fill('#username', ADMIN_CREDS.username);
    await page.fill('#password', ADMIN_CREDS.password);
    await page.click('#loginBtn');
    await page.waitForURL('**/admin.html');
    
    // Navigate to Add User tab
    await page.click('button[onclick="showTab(\'addUser\')"]');
    await page.waitForTimeout(1000);
    
    // Take screenshot before filling form
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-A03-create-mst-before.png',
      fullPage: true 
    });
    
    // Generate unique MST for this test
    const testMST = `123456789${Date.now().toString().slice(-1)}`;
    const testPassword = 'testpass123';
    const testFullName = 'NGUYỄN VĂN TEST';
    
    // Fill basic user info
    await page.fill('#mst', testMST);
    await page.fill('#password', testPassword);
    await page.fill('#confirmPassword', testPassword);
    await page.fill('#fullName', testFullName);
    await page.fill('#address', '123 Đường Test, Quận 1, TP.HCM');
    await page.fill('#taxOffice', 'Cục Thuế TP.HCM');
    await page.fill('#phone', '0901234567');
    await page.fill('#email', 'test@example.com');
    
    // Add tax item
    await page.click('button[onclick="openTaxModal()"]');
    await page.waitForTimeout(500);
    
    // Fill tax modal
    await page.fill('#modalTaxOffice', 'Đội Thuế thành phố Hạ Long');
    await page.fill('#taxStatus', 'Còn phải nộp');
    await page.fill('#taxType', 'Thuế giá trị gia tăng hàng sản xuất, kinh doanh trong nước');
    await page.fill('#taxAmount', '2500000');
    await page.fill('#taxSuggestion', 'Nộp thuế\nTra soát');
    
    // Save tax item
    await page.click('button[onclick="saveTaxItem()"]');
    await page.waitForTimeout(1000);
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for success message
    await page.waitForSelector('.status.success', { timeout: 10000 });
    
    // Take screenshot after creation
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-A03-create-mst-success.png',
      fullPage: true 
    });
    
    // Verify success message
    await expect(page.locator('.status.success')).toContainText('Đã thêm người dùng');
    
    console.log(`✅ TC-A03: Created MST ${testMST} successfully`);
  });

  test('TC-A04: View user list', async ({ page }) => {
    console.log('🧪 TC-A04: Testing view user list...');
    
    // Login first
    await page.goto(`${BASE_URL}/admin-login.html`);
    await page.fill('#username', ADMIN_CREDS.username);
    await page.fill('#password', ADMIN_CREDS.password);
    await page.click('#loginBtn');
    await page.waitForURL('**/admin.html');
    
    // Navigate to User List tab
    await page.click('button[onclick="showTab(\'userList\')"]');
    await page.waitForTimeout(1000);
    
    // Take screenshot of user list
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-A04-user-list.png',
      fullPage: true 
    });
    
    // Verify user list elements
    await expect(page.locator('.user-list')).toBeVisible();
    
    // Check if there are users (might be empty or have users)
    const userCards = page.locator('.user-card');
    const userCount = await userCards.count();
    
    if (userCount > 0) {
      // Verify user card structure
      await expect(userCards.first().locator('.user-header')).toBeVisible();
      await expect(userCards.first().locator('.user-info')).toBeVisible();
      await expect(userCards.first().locator('.tax-summary')).toBeVisible();
      await expect(userCards.first().locator('.button-group')).toBeVisible();
    }
    
    console.log(`✅ TC-A04: User list displayed with ${userCount} users`);
  });

  test('TC-A05: Upload PDF certificate', async ({ page }) => {
    console.log('🧪 TC-A05: Testing PDF certificate upload...');
    
    // Login first
    await page.goto(`${BASE_URL}/admin-login.html`);
    await page.fill('#username', ADMIN_CREDS.username);
    await page.fill('#password', ADMIN_CREDS.password);
    await page.click('#loginBtn');
    await page.waitForURL('**/admin.html');
    
    // Navigate to Certificate Manager tab
    await page.click('button[onclick="showTab(\'certificateManager\')"]');
    await page.waitForTimeout(1000);
    
    // Take screenshot before upload
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-A05-certificate-manager-before.png',
      fullPage: true 
    });
    
    // Verify certificate manager elements
    await expect(page.locator('#certMstSelect')).toBeVisible();
    await expect(page.locator('.file-upload-area')).toBeVisible();
    
    // Create a mock PDF file for testing
    const mockPDFContent = 'Mock PDF content for testing';
    const mockPDFBuffer = Buffer.from(mockPDFContent);
    
    // Set up file upload
    await page.setInputFiles('#pdfFileInput', {
      name: 'test-certificate.pdf',
      mimeType: 'application/pdf',
      buffer: mockPDFBuffer
    });
    
    // Wait for PDF processing
    await page.waitForTimeout(2000);
    
    // Take screenshot after upload
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-A05-certificate-upload.png',
      fullPage: true 
    });
    
    console.log('✅ TC-A05: PDF certificate upload tested');
  });

  test('TC-A06: Test login with created MST', async ({ page }) => {
    console.log('🧪 TC-A06: Testing login with created MST...');
    
    // First create a test MST in admin
    await page.goto(`${BASE_URL}/admin-login.html`);
    await page.fill('#username', ADMIN_CREDS.username);
    await page.fill('#password', ADMIN_CREDS.password);
    await page.click('#loginBtn');
    await page.waitForURL('**/admin.html');
    
    // Create test MST
    const testMST = `999999999${Date.now().toString().slice(-1)}`;
    const testPassword = 'testpass123';
    
    await page.click('button[onclick="showTab(\'addUser\')"]');
    await page.fill('#mst', testMST);
    await page.fill('#password', testPassword);
    await page.fill('#confirmPassword', testPassword);
    await page.fill('#fullName', 'TEST USER');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.status.success');
    
    // Now test login with this MST
    await page.goto(`${BASE_URL}/login.html`);
    await page.waitForLoadState('networkidle');
    
    // Take screenshot before login
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-A06-user-login-before.png',
      fullPage: true 
    });
    
    // Fill login form
    await page.fill('#taxId', testMST);
    await page.fill('#password', testPassword);
    await page.click('#loginBtn');
    
    // Wait for redirect to index
    await page.waitForURL('**/src/pages/index.html', { timeout: 10000 });
    
    // Take screenshot after login
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-A06-user-login-success.png',
      fullPage: true 
    });
    
    // Verify user is logged in
    await expect(page.locator('#user-mst')).toContainText(testMST);
    await expect(page.locator('#user-name')).toContainText('TEST USER');
    
    console.log(`✅ TC-A06: Successfully logged in with created MST ${testMST}`);
  });

  test('TC-A07: Export data', async ({ page }) => {
    console.log('🧪 TC-A07: Testing export data...');
    
    // Login first
    await page.goto(`${BASE_URL}/admin-login.html`);
    await page.fill('#username', ADMIN_CREDS.username);
    await page.fill('#password', ADMIN_CREDS.password);
    await page.click('#loginBtn');
    await page.waitForURL('**/admin.html');
    
    // Set up download handler
    const downloadPromise = page.waitForEvent('download');
    
    // Click export data button
    await page.click('button[onclick="exportData()"]');
    
    // Wait for download
    const download = await downloadPromise;
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-A07-export-data.png',
      fullPage: true 
    });
    
    // Verify download
    expect(download.suggestedFilename()).toMatch(/etax-mst-data-.*\.json/);
    
    console.log('✅ TC-A07: Data export successful');
  });

  test('TC-A08: Admin logout', async ({ page }) => {
    console.log('🧪 TC-A08: Testing admin logout...');
    
    // Login first
    await page.goto(`${BASE_URL}/admin-login.html`);
    await page.fill('#username', ADMIN_CREDS.username);
    await page.fill('#password', ADMIN_CREDS.password);
    await page.click('#loginBtn');
    await page.waitForURL('**/admin.html');
    
    // Take screenshot before logout
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-A08-admin-before-logout.png',
      fullPage: true 
    });
    
    // Click logout button
    await page.click('button[onclick="logout()"]');
    
    // Handle confirmation dialog
    page.on('dialog', dialog => dialog.accept());
    
    // Wait for redirect to admin login
    await page.waitForURL('**/admin-login.html', { timeout: 10000 });
    
    // Take screenshot after logout
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-A08-admin-logout-success.png',
      fullPage: true 
    });
    
    // Verify redirected to login page
    await expect(page.locator('h1')).toContainText('Admin Login');
    
    console.log('✅ TC-A08: Admin logout successful');
  });

});
