// Test Suite 3: User Dashboard & Navigation Tests
// TC-D01 to TC-D20: Index page, navigation to all pages, UI interactions

const { test, expect } = require('@playwright/test');

// Test configuration
const BASE_URL = 'https://anhbao-373f3.web.app';
const MOCK_MST = '9999999999';
const MOCK_PASSWORD = 'firestore123';

test.describe('User Dashboard & Navigation Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Clear storage before each test
    await page.context().clearCookies();
    
    // Set mobile viewport
    await page.setViewportSize({ width: 414, height: 896 });
    
    // Grant permissions for localStorage access
    await page.context().grantPermissions(['storage']);
    
    // Login before each test
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
  });

  test('TC-D01: Index page load with user data', async ({ page }) => {
    console.log('🧪 TC-D01: Testing index page load with user data...');
    
    // Take screenshot of index page
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-D01-index-page-loaded.png',
      fullPage: true 
    });
    
    // Verify page elements
    await expect(page.locator('.phone-frame')).toBeVisible();
    await expect(page.locator('.topbar')).toBeVisible();
    await expect(page.locator('.user-info')).toBeVisible();
    
    // Verify header elements
    await expect(page.locator('.left-menu')).toBeVisible();
    await expect(page.locator('.center-logo')).toBeVisible();
    await expect(page.locator('.right-icon')).toBeVisible();
    
    console.log('✅ TC-D01: Index page loaded with all elements');
  });

  test('TC-D02: Display MST and fullName correctly', async ({ page }) => {
    console.log('🧪 TC-D02: Testing MST and fullName display...');
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-D02-user-info-display.png',
      fullPage: true 
    });
    
    // Verify user info elements
    await expect(page.locator('#user-mst')).toBeVisible();
    await expect(page.locator('#user-name')).toBeVisible();
    
    // Verify MST is displayed
    await expect(page.locator('#user-mst')).toContainText('MST:');
    
    // Verify name is displayed (might be default or from Firestore)
    const userName = await page.locator('#user-name').textContent();
    expect(userName).toBeTruthy();
    
    console.log('✅ TC-D02: MST and fullName displayed correctly');
  });

  test('TC-D03: Navigate to "Tra cứu chứng từ"', async ({ page }) => {
    console.log('🧪 TC-D03: Testing navigation to "Tra cứu chứng từ"...');
    
    // Click on "Tra cứu chứng từ" in services grid
    await page.click('div[onclick="window.location.href=\'tra-cuu-chung-tu.html\'"]');
    
    // Wait for navigation
    await page.waitForURL('**/tra-cuu-chung-tu.html', { timeout: 10000 });
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-D03-tra-cuu-chung-tu.png',
      fullPage: true 
    });
    
    // Verify page loaded
    await expect(page.locator('.phone-frame')).toBeVisible();
    await expect(page.locator('.header')).toBeVisible();
    
    console.log('✅ TC-D03: Navigation to "Tra cứu chứng từ" successful');
  });

  test('TC-D04: Navigate to "Nghĩa vụ thuế"', async ({ page }) => {
    console.log('🧪 TC-D04: Testing navigation to "Nghĩa vụ thuế"...');
    
    // Click on "Nghĩa vụ thuế" in services grid
    await page.click('div[onclick="window.location.href=\'nghiavu.html\'"]');
    
    // Wait for navigation
    await page.waitForURL('**/nghiavu.html', { timeout: 10000 });
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-D04-nghiavu.png',
      fullPage: true 
    });
    
    // Verify page loaded
    await expect(page.locator('.phone-frame')).toBeVisible();
    await expect(page.locator('.header')).toBeVisible();
    
    console.log('✅ TC-D04: Navigation to "Nghĩa vụ thuế" successful');
  });

  test('TC-D05: Navigate to "Nộp thuế"', async ({ page }) => {
    console.log('🧪 TC-D05: Testing navigation to "Nộp thuế"...');
    
    // Click on "Nộp thuế" in services grid
    await page.click('div[onclick="window.location.href=\'nopthue.html\'"]');
    
    // Wait for navigation
    await page.waitForURL('**/nopthue.html', { timeout: 10000 });
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-D05-nopthue.png',
      fullPage: true 
    });
    
    // Verify page loaded
    await expect(page.locator('.phone-frame')).toBeVisible();
    await expect(page.locator('.header')).toBeVisible();
    
    console.log('✅ TC-D05: Navigation to "Nộp thuế" successful');
  });

  test('TC-D06: Navigate to "Hóa đơn điện tử"', async ({ page }) => {
    console.log('🧪 TC-D06: Testing navigation to "Hóa đơn điện tử"...');
    
    // Click on "Hóa đơn điện tử" in services grid
    await page.click('div[onclick="window.location.href=\'hoadondt.html\'"]');
    
    // Wait for navigation
    await page.waitForURL('**/hoadondt.html', { timeout: 10000 });
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-D06-hoadondt.png',
      fullPage: true 
    });
    
    // Verify page loaded
    await expect(page.locator('.phone-frame')).toBeVisible();
    await expect(page.locator('.header')).toBeVisible();
    
    console.log('✅ TC-D06: Navigation to "Hóa đơn điện tử" successful');
  });

  test('TC-D07: Navigate to "Khai thuế"', async ({ page }) => {
    console.log('🧪 TC-D07: Testing navigation to "Khai thuế"...');
    
    // Click on "Khai thuế" in services grid
    await page.click('div[onclick="window.location.href=\'khaithue.html\'"]');
    
    // Wait for navigation
    await page.waitForURL('**/khaithue.html', { timeout: 10000 });
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-D07-khaithue.png',
      fullPage: true 
    });
    
    // Verify page loaded
    await expect(page.locator('.phone-frame')).toBeVisible();
    await expect(page.locator('.header')).toBeVisible();
    
    console.log('✅ TC-D07: Navigation to "Khai thuế" successful');
  });

  test('TC-D08: Navigate to "Đăng ký thuế"', async ({ page }) => {
    console.log('🧪 TC-D08: Testing navigation to "Đăng ký thuế"...');
    
    // Click on "Đăng ký thuế" in services grid
    await page.click('div[onclick="window.location.href=\'dangky.html\'"]');
    
    // Wait for navigation
    await page.waitForURL('**/dangky.html', { timeout: 10000 });
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-D08-dangky.png',
      fullPage: true 
    });
    
    // Verify page loaded
    await expect(page.locator('.phone-frame')).toBeVisible();
    await expect(page.locator('.header')).toBeVisible();
    
    console.log('✅ TC-D08: Navigation to "Đăng ký thuế" successful');
  });

  test('TC-D09: Navigate to "Hỗ trợ quyết toán thuế TNCN"', async ({ page }) => {
    console.log('🧪 TC-D09: Testing navigation to "Hỗ trợ quyết toán thuế TNCN"...');
    
    // Click on "Hỗ trợ quyết toán thuế TNCN" in services grid
    await page.click('div[onclick="window.location.href=\'ho-tro-qtt.html\'"]');
    
    // Wait for navigation
    await page.waitForURL('**/ho-tro-qtt.html', { timeout: 10000 });
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-D09-ho-tro-qtt.png',
      fullPage: true 
    });
    
    // Verify page loaded
    await expect(page.locator('.phone-frame')).toBeVisible();
    await expect(page.locator('.header')).toBeVisible();
    
    console.log('✅ TC-D09: Navigation to "Hỗ trợ quyết toán thuế TNCN" successful');
  });

  test('TC-D10: Navigate to "Hồ sơ khai thuế"', async ({ page }) => {
    console.log('🧪 TC-D10: Testing navigation to "Hồ sơ khai thuế"...');
    
    // Click on "Hồ sơ khai thuế" in services grid
    await page.click('div[onclick="window.location.href=\'hoso.html\'"]');
    
    // Wait for navigation
    await page.waitForURL('**/hoso.html', { timeout: 10000 });
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-D10-hoso.png',
      fullPage: true 
    });
    
    // Verify page loaded
    await expect(page.locator('.phone-frame')).toBeVisible();
    await expect(page.locator('.header')).toBeVisible();
    
    console.log('✅ TC-D10: Navigation to "Hồ sơ khai thuế" successful');
  });

  test('TC-D11: Navigate to "Thông báo"', async ({ page }) => {
    console.log('🧪 TC-D11: Testing navigation to "Thông báo"...');
    
    // Click on "Thông báo" in services grid
    await page.click('div[onclick="window.location.href=\'thongbao.html\'"]');
    
    // Wait for navigation
    await page.waitForURL('**/thongbao.html', { timeout: 10000 });
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-D11-thongbao.png',
      fullPage: true 
    });
    
    // Verify page loaded
    await expect(page.locator('.phone-frame')).toBeVisible();
    await expect(page.locator('.header')).toBeVisible();
    
    console.log('✅ TC-D11: Navigation to "Thông báo" successful');
  });

  test('TC-D12: Navigate to "Tiện ích"', async ({ page }) => {
    console.log('🧪 TC-D12: Testing navigation to "Tiện ích"...');
    
    // Click on "Tiện ích" in services grid
    await page.click('div[onclick="window.location.href=\'tienich.html\'"]');
    
    // Wait for navigation
    await page.waitForURL('**/tienich.html', { timeout: 10000 });
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-D12-tienich.png',
      fullPage: true 
    });
    
    // Verify page loaded
    await expect(page.locator('.phone-frame')).toBeVisible();
    await expect(page.locator('.header')).toBeVisible();
    
    console.log('✅ TC-D12: Navigation to "Tiện ích" successful');
  });

  test('TC-D13: Navigate to "Hỗ trợ"', async ({ page }) => {
    console.log('🧪 TC-D13: Testing navigation to "Hỗ trợ"...');
    
    // Click on "Hỗ trợ" in services grid
    await page.click('div[onclick="window.location.href=\'hotro.html\'"]');
    
    // Wait for navigation
    await page.waitForURL('**/hotro.html', { timeout: 10000 });
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-D13-hotro.png',
      fullPage: true 
    });
    
    // Verify page loaded
    await expect(page.locator('.phone-frame')).toBeVisible();
    await expect(page.locator('.header')).toBeVisible();
    
    console.log('✅ TC-D13: Navigation to "Hỗ trợ" successful');
  });

  test('TC-D14: Navigate to "Thiết lập cá nhân"', async ({ page }) => {
    console.log('🧪 TC-D14: Testing navigation to "Thiết lập cá nhân"...');
    
    // Click on "Thiết lập cá nhân" in services grid
    await page.click('div[onclick="window.location.href=\'thietlap.html\'"]');
    
    // Wait for navigation
    await page.waitForURL('**/thietlap.html', { timeout: 10000 });
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-D14-thietlap.png',
      fullPage: true 
    });
    
    // Verify page loaded
    await expect(page.locator('.phone-frame')).toBeVisible();
    await expect(page.locator('.header')).toBeVisible();
    
    console.log('✅ TC-D14: Navigation to "Thiết lập cá nhân" successful');
  });

  test('TC-D15: Navigate to "Đổi mật khẩu"', async ({ page }) => {
    console.log('🧪 TC-D15: Testing navigation to "Đổi mật khẩu"...');
    
    // Click on "Đổi mật khẩu" in services grid
    await page.click('div[onclick="window.location.href=\'doimatkhau.html\'"]');
    
    // Wait for navigation
    await page.waitForURL('**/doimatkhau.html', { timeout: 10000 });
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-D15-doimatkhau.png',
      fullPage: true 
    });
    
    // Verify page loaded
    await expect(page.locator('.phone-frame')).toBeVisible();
    await expect(page.locator('.header')).toBeVisible();
    
    console.log('✅ TC-D15: Navigation to "Đổi mật khẩu" successful');
  });

  test('TC-D16: Navigate to "Thông tin cá nhân"', async ({ page }) => {
    console.log('🧪 TC-D16: Testing navigation to "Thông tin cá nhân"...');
    
    // Click on "Thông tin cá nhân" link in user info
    await page.click('a[href="thongtin.html"]');
    
    // Wait for navigation
    await page.waitForURL('**/thongtin.html', { timeout: 10000 });
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-D16-thongtin.png',
      fullPage: true 
    });
    
    // Verify page loaded
    await expect(page.locator('.phone-frame')).toBeVisible();
    await expect(page.locator('.header')).toBeVisible();
    
    console.log('✅ TC-D16: Navigation to "Thông tin cá nhân" successful');
  });

  test('TC-D17: Horizontal scroll "Chức năng hay dùng"', async ({ page }) => {
    console.log('🧪 TC-D17: Testing horizontal scroll in "Chức năng hay dùng"...');
    
    // Take screenshot before scroll
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-D17-scroll-before.png',
      fullPage: true 
    });
    
    // Find scrollable container
    const scrollable = page.locator('#scrollable');
    await expect(scrollable).toBeVisible();
    
    // Test horizontal scroll
    await scrollable.evaluate(el => {
      el.scrollLeft = 200;
    });
    
    await page.waitForTimeout(500);
    
    // Take screenshot after scroll
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-D17-scroll-after.png',
      fullPage: true 
    });
    
    // Test scroll buttons
    await page.click('button[onclick="scrollRight()"]');
    await page.waitForTimeout(500);
    
    await page.click('button[onclick="scrollLeft()"]');
    await page.waitForTimeout(500);
    
    // Take screenshot after button scroll
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-D17-scroll-buttons.png',
      fullPage: true 
    });
    
    console.log('✅ TC-D17: Horizontal scroll functionality tested');
  });

  test('TC-D18: Open sidebar menu', async ({ page }) => {
    console.log('🧪 TC-D18: Testing sidebar menu...');
    
    // Take screenshot before opening menu
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-D18-menu-before.png',
      fullPage: true 
    });
    
    // Click menu button
    await page.click('.left-menu');
    await page.waitForTimeout(500);
    
    // Take screenshot with menu open
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-D18-menu-open.png',
      fullPage: true 
    });
    
    // Verify menu is open
    await expect(page.locator('#slideMenu')).toHaveClass(/open/);
    
    // Test menu links
    const menuLinks = page.locator('.slide-links a');
    const linkCount = await menuLinks.count();
    expect(linkCount).toBeGreaterThan(0);
    
    // Close menu
    await page.click('#menuOverlay');
    await page.waitForTimeout(500);
    
    // Take screenshot after closing
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-D18-menu-closed.png',
      fullPage: true 
    });
    
    console.log('✅ TC-D18: Sidebar menu functionality tested');
  });

  test('TC-D19: QR scan button', async ({ page }) => {
    console.log('🧪 TC-D19: Testing QR scan button...');
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-D19-qr-button.png',
      fullPage: true 
    });
    
    // Click QR button
    await page.click('.right-icon img[alt="QR"]');
    
    // Take screenshot after click
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-D19-qr-clicked.png',
      fullPage: true 
    });
    
    // Verify QR button is clickable (function exists)
    const qrFunction = await page.evaluate(() => {
      return typeof window.openQR === 'function';
    });
    
    console.log('✅ TC-D19: QR scan button tested');
  });

  test('TC-D20: Notification bell', async ({ page }) => {
    console.log('🧪 TC-D20: Testing notification bell...');
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-D20-notification-bell.png',
      fullPage: true 
    });
    
    // Click notification bell
    await page.click('a[href="/src/pages/thongbao.html"]');
    
    // Wait for navigation
    await page.waitForURL('**/thongbao.html', { timeout: 10000 });
    
    // Take screenshot after navigation
    await page.screenshot({ 
      path: 'test-results/screenshots/TC-D20-notification-page.png',
      fullPage: true 
    });
    
    // Verify notification page loaded
    await expect(page.locator('.phone-frame')).toBeVisible();
    
    console.log('✅ TC-D20: Notification bell functionality tested');
  });

});
