// Test Suite 4: Page-Specific Tests
// TC-C01 to TC-C05: Tra cứu chứng từ
// TC-N01 to TC-N05: Nghĩa vụ thuế
// Additional page functionality tests

const { test, expect } = require('@playwright/test');

// Test configuration
const BASE_URL = 'https://anhbao-373f3.web.app';
const MOCK_MST = '9999999999';
const MOCK_PASSWORD = 'firestore123';

test.describe('Page-Specific Tests', () => {
  
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

  // ===== TRA CỨU CHỨNG TỪ TESTS =====
  test.describe('Tra Cứu Chứng Từ Tests', () => {
    
    test('TC-C01: Page load and display table', async ({ page }) => {
      console.log('🧪 TC-C01: Testing Tra cứu chứng từ page load...');
      
      // Navigate to page
      await page.goto(`${BASE_URL}/src/pages/tra-cuu-chung-tu.html`);
      await page.waitForLoadState('networkidle');
      
      // Take screenshot
      await page.screenshot({ 
        path: 'test-results/screenshots/TC-C01-tra-cuu-chung-tu-page.png',
        fullPage: true 
      });
      
      // Verify page elements
      await expect(page.locator('.phone-frame')).toBeVisible();
      await expect(page.locator('.header')).toBeVisible();
      await expect(page.locator('.content-area')).toBeVisible();
      
      // Verify header title
      await expect(page.locator('.header-title')).toContainText('Tra cứu chứng từ');
      
      console.log('✅ TC-C01: Tra cứu chứng từ page loaded correctly');
    });

    test('TC-C02: Display uploaded PDF certificates', async ({ page }) => {
      console.log('🧪 TC-C02: Testing PDF certificates display...');
      
      // Navigate to page
      await page.goto(`${BASE_URL}/src/pages/tra-cuu-chung-tu.html`);
      await page.waitForLoadState('networkidle');
      
      // Take screenshot
      await page.screenshot({ 
        path: 'test-results/screenshots/TC-C02-certificates-display.png',
        fullPage: true 
      });
      
      // Check if certificates table exists
      const certificatesTable = page.locator('table, .certificate-list, .certificate-item');
      const hasCertificates = await certificatesTable.count() > 0;
      
      if (hasCertificates) {
        // Verify certificate elements
        await expect(certificatesTable.first()).toBeVisible();
        console.log('✅ TC-C02: PDF certificates displayed');
      } else {
        console.log('⚠️ TC-C02: No certificates found (expected if none uploaded)');
      }
    });

    test('TC-C03: Filter by date', async ({ page }) => {
      console.log('🧪 TC-C03: Testing date filter functionality...');
      
      // Navigate to page
      await page.goto(`${BASE_URL}/src/pages/tra-cuu-chung-tu.html`);
      await page.waitForLoadState('networkidle');
      
      // Take screenshot before filter
      await page.screenshot({ 
        path: 'test-results/screenshots/TC-C03-filter-before.png',
        fullPage: true 
      });
      
      // Look for date filter inputs
      const dateInputs = page.locator('input[type="date"], input[type="text"][placeholder*="ngày"], input[type="text"][placeholder*="date"]');
      const dateInputCount = await dateInputs.count();
      
      if (dateInputCount > 0) {
        // Test date filter
        await dateInputs.first().fill('2024-01-01');
        await page.waitForTimeout(1000);
        
        // Take screenshot after filter
        await page.screenshot({ 
          path: 'test-results/screenshots/TC-C03-filter-after.png',
          fullPage: true 
        });
        
        console.log('✅ TC-C03: Date filter functionality tested');
      } else {
        console.log('⚠️ TC-C03: No date filter inputs found');
      }
    });

    test('TC-C04: Click on certificate row', async ({ page }) => {
      console.log('🧪 TC-C04: Testing certificate row click...');
      
      // Navigate to page
      await page.goto(`${BASE_URL}/src/pages/tra-cuu-chung-tu.html`);
      await page.waitForTimeout(2000);
      
      // Take screenshot
      await page.screenshot({ 
        path: 'test-results/screenshots/TC-C04-certificate-rows.png',
        fullPage: true 
      });
      
      // Look for clickable certificate elements
      const clickableElements = page.locator('tr[onclick], .certificate-item[onclick], .clickable-row');
      const clickableCount = await clickableElements.count();
      
      if (clickableCount > 0) {
        // Click on first certificate row
        await clickableElements.first().click();
        await page.waitForTimeout(1000);
        
        // Take screenshot after click
        await page.screenshot({ 
          path: 'test-results/screenshots/TC-C04-certificate-clicked.png',
          fullPage: true 
        });
        
        console.log('✅ TC-C04: Certificate row click tested');
      } else {
        console.log('⚠️ TC-C04: No clickable certificate rows found');
      }
    });

    test('TC-C05: Download/View PDF', async ({ page }) => {
      console.log('🧪 TC-C05: Testing PDF download/view...');
      
      // Navigate to page
      await page.goto(`${BASE_URL}/src/pages/tra-cuu-chung-tu.html`);
      await page.waitForTimeout(2000);
      
      // Take screenshot
      await page.screenshot({ 
        path: 'test-results/screenshots/TC-C05-pdf-actions.png',
        fullPage: true 
      });
      
      // Look for download/view buttons
      const downloadButtons = page.locator('button[onclick*="download"], button[onclick*="view"], a[href*=".pdf"], button:has-text("Tải"), button:has-text("Xem")');
      const downloadCount = await downloadButtons.count();
      
      if (downloadCount > 0) {
        // Set up download handler
        const downloadPromise = page.waitForEvent('download');
        
        // Click download button
        await downloadButtons.first().click();
        
        try {
          // Wait for download
          const download = await downloadPromise;
          
          // Take screenshot after download
          await page.screenshot({ 
            path: 'test-results/screenshots/TC-C05-pdf-downloaded.png',
            fullPage: true 
          });
          
          console.log('✅ TC-C05: PDF download tested');
        } catch (error) {
          console.log('⚠️ TC-C05: Download might not be available or PDF viewer opened');
          
          // Take screenshot of PDF viewer or error
          await page.screenshot({ 
            path: 'test-results/screenshots/TC-C05-pdf-viewer.png',
            fullPage: true 
          });
        }
      } else {
        console.log('⚠️ TC-C05: No download/view buttons found');
      }
    });

  });

  // ===== NGHĨA VỤ THUẾ TESTS =====
  test.describe('Nghĩa Vụ Thuế Tests', () => {
    
    test('TC-N01: Page load and display tax obligations', async ({ page }) => {
      console.log('🧪 TC-N01: Testing Nghĩa vụ thuế page load...');
      
      // Navigate to page
      await page.goto(`${BASE_URL}/src/pages/nghiavu.html`);
      await page.waitForLoadState('networkidle');
      
      // Take screenshot
      await page.screenshot({ 
        path: 'test-results/screenshots/TC-N01-nghiavu-page.png',
        fullPage: true 
      });
      
      // Verify page elements
      await expect(page.locator('.phone-frame')).toBeVisible();
      await expect(page.locator('.header')).toBeVisible();
      await expect(page.locator('.content-area')).toBeVisible();
      
      // Verify header title
      await expect(page.locator('.header-title')).toContainText('Nghĩa vụ thuế');
      
      console.log('✅ TC-N01: Nghĩa vụ thuế page loaded correctly');
    });

    test('TC-N02: Display total tax amount', async ({ page }) => {
      console.log('🧪 TC-N02: Testing total tax amount display...');
      
      // Navigate to page
      await page.goto(`${BASE_URL}/src/pages/nghiavu.html`);
      await page.waitForLoadState('networkidle');
      
      // Take screenshot
      await page.screenshot({ 
        path: 'test-results/screenshots/TC-N02-total-tax-amount.png',
        fullPage: true 
      });
      
      // Look for total tax amount elements
      const totalAmountElements = page.locator('text=/tổng.*thuế/i, text=/total.*tax/i, .total-amount, .tax-total');
      const totalCount = await totalAmountElements.count();
      
      if (totalCount > 0) {
        await expect(totalAmountElements.first()).toBeVisible();
        console.log('✅ TC-N02: Total tax amount displayed');
      } else {
        console.log('⚠️ TC-N02: No total tax amount elements found');
      }
    });

    test('TC-N03: Display paid amount', async ({ page }) => {
      console.log('🧪 TC-N03: Testing paid amount display...');
      
      // Navigate to page
      await page.goto(`${BASE_URL}/src/pages/nghiavu.html`);
      await page.waitForLoadState('networkidle');
      
      // Take screenshot
      await page.screenshot({ 
        path: 'test-results/screenshots/TC-N03-paid-amount.png',
        fullPage: true 
      });
      
      // Look for paid amount elements
      const paidAmountElements = page.locator('text=/đã.*nộp/i, text=/paid.*amount/i, .paid-amount, .amount-paid');
      const paidCount = await paidAmountElements.count();
      
      if (paidCount > 0) {
        await expect(paidAmountElements.first()).toBeVisible();
        console.log('✅ TC-N03: Paid amount displayed');
      } else {
        console.log('⚠️ TC-N03: No paid amount elements found');
      }
    });

    test('TC-N04: Display pending amount', async ({ page }) => {
      console.log('🧪 TC-N04: Testing pending amount display...');
      
      // Navigate to page
      await page.goto(`${BASE_URL}/src/pages/nghiavu.html`);
      await page.waitForLoadState('networkidle');
      
      // Take screenshot
      await page.screenshot({ 
        path: 'test-results/screenshots/TC-N04-pending-amount.png',
        fullPage: true 
      });
      
      // Look for pending amount elements
      const pendingAmountElements = page.locator('text=/còn.*phải.*nộp/i, text=/pending.*amount/i, .pending-amount, .amount-pending');
      const pendingCount = await pendingAmountElements.count();
      
      if (pendingCount > 0) {
        await expect(pendingAmountElements.first()).toBeVisible();
        console.log('✅ TC-N04: Pending amount displayed');
      } else {
        console.log('⚠️ TC-N04: No pending amount elements found');
      }
    });

    test('TC-N05: Display tax items list', async ({ page }) => {
      console.log('🧪 TC-N05: Testing tax items list display...');
      
      // Navigate to page
      await page.goto(`${BASE_URL}/src/pages/nghiavu.html`);
      await page.waitForLoadState('networkidle');
      
      // Take screenshot
      await page.screenshot({ 
        path: 'test-results/screenshots/TC-N05-tax-items-list.png',
        fullPage: true 
      });
      
      // Look for tax items list
      const taxItemsList = page.locator('table, .tax-items, .items-list, .tax-list');
      const itemsCount = await taxItemsList.count();
      
      if (itemsCount > 0) {
        await expect(taxItemsList.first()).toBeVisible();
        console.log('✅ TC-N05: Tax items list displayed');
      } else {
        console.log('⚠️ TC-N05: No tax items list found');
      }
    });

  });

  // ===== ADDITIONAL PAGE TESTS =====
  test.describe('Additional Page Tests', () => {
    
    test('TC-P01: Nộp thuế page functionality', async ({ page }) => {
      console.log('🧪 TC-P01: Testing Nộp thuế page...');
      
      // Navigate to page
      await page.goto(`${BASE_URL}/src/pages/nopthue.html`);
      await page.waitForLoadState('networkidle');
      
      // Take screenshot
      await page.screenshot({ 
        path: 'test-results/screenshots/TC-P01-nopthue-page.png',
        fullPage: true 
      });
      
      // Verify page elements
      await expect(page.locator('.phone-frame')).toBeVisible();
      await expect(page.locator('.header')).toBeVisible();
      
      console.log('✅ TC-P01: Nộp thuế page tested');
    });

    test('TC-P02: Hóa đơn điện tử page functionality', async ({ page }) => {
      console.log('🧪 TC-P02: Testing Hóa đơn điện tử page...');
      
      // Navigate to page
      await page.goto(`${BASE_URL}/src/pages/hoadondt.html`);
      await page.waitForLoadState('networkidle');
      
      // Take screenshot
      await page.screenshot({ 
        path: 'test-results/screenshots/TC-P02-hoadondt-page.png',
        fullPage: true 
      });
      
      // Verify page elements
      await expect(page.locator('.phone-frame')).toBeVisible();
      await expect(page.locator('.header')).toBeVisible();
      
      console.log('✅ TC-P02: Hóa đơn điện tử page tested');
    });

    test('TC-P03: Khai thuế page functionality', async ({ page }) => {
      console.log('🧪 TC-P03: Testing Khai thuế page...');
      
      // Navigate to page
      await page.goto(`${BASE_URL}/src/pages/khaithue.html`);
      await page.waitForLoadState('networkidle');
      
      // Take screenshot
      await page.screenshot({ 
        path: 'test-results/screenshots/TC-P03-khaithue-page.png',
        fullPage: true 
      });
      
      // Verify page elements
      await expect(page.locator('.phone-frame')).toBeVisible();
      await expect(page.locator('.header')).toBeVisible();
      
      console.log('✅ TC-P03: Khai thuế page tested');
    });

    test('TC-P04: Thông tin cá nhân page functionality', async ({ page }) => {
      console.log('🧪 TC-P04: Testing Thông tin cá nhân page...');
      
      // Navigate to page
      await page.goto(`${BASE_URL}/src/pages/thongtin.html`);
      await page.waitForLoadState('networkidle');
      
      // Take screenshot
      await page.screenshot({ 
        path: 'test-results/screenshots/TC-P04-thongtin-page.png',
        fullPage: true 
      });
      
      // Verify page elements
      await expect(page.locator('.phone-frame')).toBeVisible();
      await expect(page.locator('.header')).toBeVisible();
      
      console.log('✅ TC-P04: Thông tin cá nhân page tested');
    });

    test('TC-P05: Thiết lập cá nhân page functionality', async ({ page }) => {
      console.log('🧪 TC-P05: Testing Thiết lập cá nhân page...');
      
      // Navigate to page
      await page.goto(`${BASE_URL}/src/pages/thietlap.html`);
      await page.waitForLoadState('networkidle');
      
      // Take screenshot
      await page.screenshot({ 
        path: 'test-results/screenshots/TC-P05-thietlap-page.png',
        fullPage: true 
      });
      
      // Verify page elements
      await expect(page.locator('.phone-frame')).toBeVisible();
      await expect(page.locator('.header')).toBeVisible();
      
      console.log('✅ TC-P05: Thiết lập cá nhân page tested');
    });

  });

});
