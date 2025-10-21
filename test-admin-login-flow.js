const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Test configuration
const BASE_URL = 'https://anhbao-373f3.web.app';
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'Baoan2022'
};

// Test data
const TEST_MST = `TEST${Date.now()}`;
const TEST_PASSWORD = 'test123456';
const TEST_USER_DATA = {
    fullName: 'NGUYỄN VĂN TEST',
    address: '123 Đường Test, Quận 1, TP.HCM',
    taxOffice: 'Cục Thuế TP.HCM',
    phone: '0901234567',
    email: 'test@example.com'
};

class AdminLoginFlowTest {
    constructor() {
        this.browser = null;
        this.page = null;
        this.results = {
            startTime: new Date(),
            steps: [],
            screenshots: [],
            errors: [],
            success: false
        };
    }

    async init() {
        console.log('🚀 Starting Admin Login Flow Test...');
        
        // Launch browser with visible UI
        this.browser = await puppeteer.launch({
            headless: false, // Show browser
            defaultViewport: { width: 1280, height: 720 },
            args: ['--start-maximized']
        });

        this.page = await this.browser.newPage();
        
        // Enable console logging
        this.page.on('console', msg => {
            console.log(`📱 Browser Console [${msg.type()}]:`, msg.text());
        });

        // Capture errors
        this.page.on('pageerror', error => {
            console.error('❌ Page Error:', error.message);
            this.results.errors.push({
                type: 'page_error',
                message: error.message,
                timestamp: new Date()
            });
        });
    }

    async takeScreenshot(stepName) {
        const screenshotPath = `screenshots/${stepName}-${Date.now()}.png`;
        await this.page.screenshot({ 
            path: screenshotPath,
            fullPage: true 
        });
        
        this.results.screenshots.push({
            step: stepName,
            path: screenshotPath,
            timestamp: new Date()
        });
        
        console.log(`📸 Screenshot taken: ${stepName}`);
    }

    async step1_OpenAdminLogin() {
        console.log('📋 Step 1: Opening Admin Login Page...');
        
        try {
            await this.page.goto(`${BASE_URL}/admin-login.html`, { 
                waitUntil: 'networkidle2',
                timeout: 30000 
            });
            
            await this.takeScreenshot('01-admin-login-page');
            
            this.results.steps.push({
                step: 1,
                name: 'Open Admin Login',
                status: 'success',
                timestamp: new Date()
            });
            
            console.log('✅ Admin login page loaded successfully');
        } catch (error) {
            console.error('❌ Failed to open admin login page:', error);
            this.results.steps.push({
                step: 1,
                name: 'Open Admin Login',
                status: 'failed',
                error: error.message,
                timestamp: new Date()
            });
            throw error;
        }
    }

    async step2_LoginAsAdmin() {
        console.log('📋 Step 2: Logging in as Admin...');
        
        try {
            // Fill admin credentials
            await this.page.waitForSelector('#username', { timeout: 10000 });
            await this.page.type('#username', ADMIN_CREDENTIALS.username);
            await this.page.type('#password', ADMIN_CREDENTIALS.password);
            
            await this.takeScreenshot('02-admin-credentials-filled');
            
            // Click login button
            await this.page.click('button[type="submit"]');
            
            // Wait for redirect to admin panel
            await this.page.waitForNavigation({ 
                waitUntil: 'networkidle2',
                timeout: 15000 
            });
            
            await this.takeScreenshot('03-admin-panel-loaded');
            
            this.results.steps.push({
                step: 2,
                name: 'Login as Admin',
                status: 'success',
                timestamp: new Date()
            });
            
            console.log('✅ Admin login successful');
        } catch (error) {
            console.error('❌ Failed to login as admin:', error);
            this.results.steps.push({
                step: 2,
                name: 'Login as Admin',
                status: 'failed',
                error: error.message,
                timestamp: new Date()
            });
            throw error;
        }
    }

    async step3_CreateNewMST() {
        console.log('📋 Step 3: Creating New MST...');
        
        try {
            // Click on "Thêm MST" tab
            await this.page.waitForSelector('[onclick*="showTab(\'addUser\')"]', { timeout: 10000 });
            await this.page.click('[onclick*="showTab(\'addUser\')"]');
            
            await this.takeScreenshot('04-add-mst-tab');
            
            // Fill MST form
            await this.page.waitForSelector('#mst', { timeout: 10000 });
            
            await this.page.type('#mst', TEST_MST);
            await this.page.type('#password', TEST_PASSWORD);
            await this.page.type('#confirmPassword', TEST_PASSWORD);
            await this.page.type('#fullName', TEST_USER_DATA.fullName);
            await this.page.type('#address', TEST_USER_DATA.address);
            await this.page.type('#taxOffice', TEST_USER_DATA.taxOffice);
            await this.page.type('#phone', TEST_USER_DATA.phone);
            await this.page.type('#email', TEST_USER_DATA.email);
            
            await this.takeScreenshot('05-mst-form-filled');
            
            // Submit form
            await this.page.click('button[type="submit"]');
            
            // Wait for success message
            await this.page.waitForFunction(() => {
                const statusElement = document.getElementById('statusMessage');
                return statusElement && statusElement.textContent.includes('Đã thêm người dùng');
            }, { timeout: 15000 });
            
            await this.takeScreenshot('06-mst-created-success');
            
            this.results.steps.push({
                step: 3,
                name: 'Create New MST',
                status: 'success',
                mst: TEST_MST,
                timestamp: new Date()
            });
            
            console.log(`✅ MST ${TEST_MST} created successfully`);
        } catch (error) {
            console.error('❌ Failed to create MST:', error);
            this.results.steps.push({
                step: 3,
                name: 'Create New MST',
                status: 'failed',
                error: error.message,
                timestamp: new Date()
            });
            throw error;
        }
    }

    async step4_OpenLoginPage() {
        console.log('📋 Step 4: Opening Login Page...');
        
        try {
            // Open login page in new tab
            const loginPage = await this.browser.newPage();
            await loginPage.goto(`${BASE_URL}/login.html`, { 
                waitUntil: 'networkidle2',
                timeout: 30000 
            });
            
            await loginPage.screenshot({ 
                path: `screenshots/07-login-page-${Date.now()}.png`,
                fullPage: true 
            });
            
            this.results.steps.push({
                step: 4,
                name: 'Open Login Page',
                status: 'success',
                timestamp: new Date()
            });
            
            console.log('✅ Login page opened successfully');
            return loginPage;
        } catch (error) {
            console.error('❌ Failed to open login page:', error);
            this.results.steps.push({
                step: 4,
                name: 'Open Login Page',
                status: 'failed',
                error: error.message,
                timestamp: new Date()
            });
            throw error;
        }
    }

    async step5_LoginWithNewMST(loginPage) {
        console.log('📋 Step 5: Logging in with New MST...');
        
        try {
            // Wait a bit for data sync
            await new Promise(resolve => setTimeout(resolve, 5000));
            
            // Fill login form
            await loginPage.waitForSelector('#taxId', { timeout: 10000 });
            await loginPage.type('#taxId', TEST_MST);
            await loginPage.type('#password', TEST_PASSWORD);
            
            await loginPage.screenshot({ 
                path: `screenshots/08-login-form-filled-${Date.now()}.png`,
                fullPage: true 
            });
            
            // Submit login form
            await loginPage.click('#loginBtn');
            
            // Wait for redirect to index page
            await loginPage.waitForNavigation({ 
                waitUntil: 'networkidle2',
                timeout: 15000 
            });
            
            await loginPage.screenshot({ 
                path: `screenshots/09-login-success-${Date.now()}.png`,
                fullPage: true 
            });
            
            // Verify we're on index page
            const currentUrl = loginPage.url();
            if (currentUrl.includes('index.html')) {
                this.results.steps.push({
                    step: 5,
                    name: 'Login with New MST',
                    status: 'success',
                    redirectUrl: currentUrl,
                    timestamp: new Date()
                });
                
                console.log('✅ Login with new MST successful');
                return true;
            } else {
                throw new Error(`Unexpected redirect to: ${currentUrl}`);
            }
        } catch (error) {
            console.error('❌ Failed to login with new MST:', error);
            this.results.steps.push({
                step: 5,
                name: 'Login with New MST',
                status: 'failed',
                error: error.message,
                timestamp: new Date()
            });
            throw error;
        }
    }

    async step6_VerifyUserData(loginPage) {
        console.log('📋 Step 6: Verifying User Data Display...');
        
        try {
            // Check if user data is displayed correctly
            await loginPage.waitForSelector('#user-mst', { timeout: 10000 });
            
            const mstElement = await loginPage.$eval('#user-mst', el => el.textContent);
            const nameElement = await loginPage.$eval('#user-name', el => el.textContent);
            
            await loginPage.screenshot({ 
                path: `screenshots/10-user-data-verified-${Date.now()}.png`,
                fullPage: true 
            });
            
            if (mstElement.includes(TEST_MST) && nameElement.includes(TEST_USER_DATA.fullName)) {
                this.results.steps.push({
                    step: 6,
                    name: 'Verify User Data',
                    status: 'success',
                    mstDisplayed: mstElement,
                    nameDisplayed: nameElement,
                    timestamp: new Date()
                });
                
                console.log('✅ User data verified successfully');
                return true;
            } else {
                throw new Error(`User data mismatch. MST: ${mstElement}, Name: ${nameElement}`);
            }
        } catch (error) {
            console.error('❌ Failed to verify user data:', error);
            this.results.steps.push({
                step: 6,
                name: 'Verify User Data',
                status: 'failed',
                error: error.message,
                timestamp: new Date()
            });
            throw error;
        }
    }

    async runTest() {
        try {
            await this.init();
            
            // Create screenshots directory
            if (!fs.existsSync('screenshots')) {
                fs.mkdirSync('screenshots');
            }
            
            await this.step1_OpenAdminLogin();
            await this.step2_LoginAsAdmin();
            await this.step3_CreateNewMST();
            
            const loginPage = await this.step4_OpenLoginPage();
            const loginSuccess = await this.step5_LoginWithNewMST(loginPage);
            const dataVerified = await this.step6_VerifyUserData(loginPage);
            
            if (loginSuccess && dataVerified) {
                this.results.success = true;
                console.log('🎉 ALL TESTS PASSED! Admin → Login flow working correctly.');
            }
            
        } catch (error) {
            console.error('💥 Test failed:', error);
            this.results.success = false;
        } finally {
            this.results.endTime = new Date();
            this.results.duration = this.results.endTime - this.results.startTime;
            
            // Save results
            await this.saveResults();
            
            // Keep browser open for manual inspection
            console.log('🔍 Browser will remain open for manual inspection. Close manually when done.');
            
            // Uncomment to auto-close browser
            // await this.browser.close();
        }
    }

    async saveResults() {
        const resultsPath = 'TEST-RESULTS.json';
        fs.writeFileSync(resultsPath, JSON.stringify(this.results, null, 2));
        console.log(`📊 Test results saved to: ${resultsPath}`);
        
        // Also create markdown report
        const markdownReport = this.generateMarkdownReport();
        fs.writeFileSync('TEST-RESULTS.md', markdownReport);
        console.log(`📋 Markdown report saved to: TEST-RESULTS.md`);
    }

    generateMarkdownReport() {
        const duration = Math.round(this.results.duration / 1000);
        const status = this.results.success ? '✅ PASSED' : '❌ FAILED';
        
        let report = `# Admin MST → Login Flow Test Results

## Test Summary
- **Status**: ${status}
- **Duration**: ${duration} seconds
- **Test MST**: ${TEST_MST}
- **Test Password**: ${TEST_PASSWORD}
- **Start Time**: ${this.results.startTime}
- **End Time**: ${this.results.endTime}

## Test Steps

`;

        this.results.steps.forEach((step, index) => {
            const statusIcon = step.status === 'success' ? '✅' : '❌';
            report += `### Step ${step.step}: ${step.name} ${statusIcon}

- **Status**: ${step.status}
- **Timestamp**: ${step.timestamp}
${step.error ? `- **Error**: ${step.error}` : ''}
${step.mst ? `- **MST**: ${step.mst}` : ''}
${step.redirectUrl ? `- **Redirect URL**: ${step.redirectUrl}` : ''}
${step.mstDisplayed ? `- **MST Displayed**: ${step.mstDisplayed}` : ''}
${step.nameDisplayed ? `- **Name Displayed**: ${step.nameDisplayed}` : ''}

`;
        });

        if (this.results.errors.length > 0) {
            report += `## Errors

`;
            this.results.errors.forEach((error, index) => {
                report += `${index + 1}. **${error.type}**: ${error.message}
   - Time: ${error.timestamp}

`;
            });
        }

        report += `## Screenshots

`;
        this.results.screenshots.forEach((screenshot, index) => {
            report += `${index + 1}. **${screenshot.step}**: \`${screenshot.path}\`
   - Time: ${screenshot.timestamp}

`;
        });

        return report;
    }
}

// Run the test
async function runTest() {
    const test = new AdminLoginFlowTest();
    await test.runTest();
}

// Export for potential reuse
module.exports = AdminLoginFlowTest;

// Run if called directly
if (require.main === module) {
    runTest().catch(console.error);
}
