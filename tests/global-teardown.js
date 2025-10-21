// Global teardown for eTax Mobile PWA E2E Tests
const fs = require('fs');
const path = require('path');

/**
 * Global teardown runs after all tests
 * - Clean up test artifacts
 * - Generate summary report
 * - Archive test results
 */
async function globalTeardown(config) {
  console.log('🧹 Starting eTax Mobile PWA E2E Test Teardown...');
  
  try {
    const testResultsDir = path.join(__dirname, 'test-results');
    const reportsDir = path.join(testResultsDir, 'reports');
    
    // Read test results
    const resultsFile = path.join(reportsDir, 'test-results.json');
    let testResults = {};
    
    if (fs.existsSync(resultsFile)) {
      const resultsData = fs.readFileSync(resultsFile, 'utf8');
      testResults = JSON.parse(resultsData);
    }
    
    // Generate summary report
    const summary = {
      timestamp: new Date().toISOString(),
      totalTests: testResults.stats?.total || 0,
      passed: testResults.stats?.passed || 0,
      failed: testResults.stats?.failed || 0,
      skipped: testResults.stats?.skipped || 0,
      duration: testResults.stats?.duration || 0,
      passRate: testResults.stats?.total > 0 ? 
        ((testResults.stats?.passed || 0) / testResults.stats?.total * 100).toFixed(2) + '%' : '0%',
      testSuites: testResults.suites?.length || 0,
      browsers: ['chromium-mobile', 'firefox-mobile', 'webkit-mobile'],
      environment: {
        baseURL: 'https://anhbao-373f3.web.app',
        viewport: '414x896 (iPhone XS Max)',
        testFramework: 'Playwright'
      }
    };
    
    // Ensure reports directory exists
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    // Write summary report
    fs.writeFileSync(
      path.join(reportsDir, 'summary.json'),
      JSON.stringify(summary, null, 2)
    );
    
    // Generate markdown summary
    const markdownSummary = `# eTax Mobile PWA - E2E Test Results Summary

## 📊 Test Statistics
- **Total Tests:** ${summary.totalTests}
- **Passed:** ${summary.passed} ✅
- **Failed:** ${summary.failed} ❌
- **Skipped:** ${summary.skipped} ⏭️
- **Pass Rate:** ${summary.passRate}
- **Duration:** ${(summary.duration / 1000).toFixed(2)}s

## 🌐 Test Environment
- **Base URL:** ${summary.environment.baseURL}
- **Viewport:** ${summary.environment.viewport}
- **Browsers:** ${summary.browsers.join(', ')}
- **Framework:** ${summary.environment.testFramework}

## 📁 Test Results
- **Screenshots:** \`test-results/screenshots/\`
- **Videos:** \`test-results/videos/\`
- **Reports:** \`test-results/reports/\`
- **HTML Report:** \`test-results/reports/html-report/index.html\`

## 🎯 Test Coverage
- ✅ Admin Flow (8 test cases)
- ✅ User Authentication (6 test cases)  
- ✅ User Dashboard & Navigation (20+ test cases)
- ✅ Page-specific Tests (10+ test cases)
- ✅ Cross-Device Sync (4 test cases)

---
*Generated on: ${summary.timestamp}*
`;
    
    fs.writeFileSync(
      path.join(reportsDir, 'summary.md'),
      markdownSummary
    );
    
    console.log('✅ Summary report generated');
    console.log(`📊 Test Results: ${summary.passed}/${summary.totalTests} passed (${summary.passRate})`);
    console.log('📁 Results saved to: test-results/');
    console.log('🎯 Teardown completed successfully');
    
  } catch (error) {
    console.error('❌ Global teardown failed:', error);
    throw error;
  }
}

module.exports = globalTeardown;
