/**
 * Agent Automation Test Suite
 * Test và verify agent automation hoạt động đúng
 */

class AgentAutomationTest {
    constructor() {
        this.testResults = [];
        this.isRunning = false;
    }
    
    async runAllTests() {
        console.log('🧪 Starting Agent Automation Test Suite...');
        this.isRunning = true;
        
        try {
            // Test 1: Module Loading
            await this.testModuleLoading();
            
            // Test 2: Layout Management
            await this.testLayoutManagement();
            
            // Test 3: Workflow Management
            await this.testWorkflowManagement();
            
            // Test 4: UI Preservation
            await this.testUIPreservation();
            
            // Test 5: Agent Automation
            await this.testAgentAutomation();
            
            // Test 6: Integration
            await this.testIntegration();
            
            // Display results
            this.displayResults();
            
        } catch (error) {
            console.error('❌ Test suite failed:', error);
        } finally {
            this.isRunning = false;
        }
    }
    
    async testModuleLoading() {
        console.log('🔍 Testing Module Loading...');
        
        const tests = [
            {
                name: 'AgentLayoutManager loaded',
                test: () => !!window.agentLayoutManager,
                expected: true
            },
            {
                name: 'AgentWorkflowManager loaded',
                test: () => !!window.agentWorkflowManager,
                expected: true
            },
            {
                name: 'AgentUIPreserver loaded',
                test: () => !!window.agentUIPreserver,
                expected: true
            },
            {
                name: 'AgentAutomation loaded',
                test: () => !!window.agentAutomation,
                expected: true
            }
        ];
        
        for (const test of tests) {
            const result = test.test();
            const passed = result === test.expected;
            
            this.testResults.push({
                category: 'Module Loading',
                name: test.name,
                passed,
                result,
                expected: test.expected
            });
            
            console.log(`${passed ? '✅' : '❌'} ${test.name}: ${result}`);
        }
    }
    
    async testLayoutManagement() {
        console.log('📱 Testing Layout Management...');
        
        if (!window.agentLayoutManager) {
            console.warn('⚠️ AgentLayoutManager not available');
            return;
        }
        
        const tests = [
            {
                name: 'Layout detection works',
                test: () => {
                    const layout = window.agentLayoutManager.detectCurrentLayout();
                    return layout && typeof layout === 'object';
                },
                expected: true
            },
            {
                name: 'Layout info available',
                test: () => {
                    const info = window.agentLayoutManager.getLayoutInfo();
                    return info && typeof info === 'object';
                },
                expected: true
            },
            {
                name: 'Agent mode toggle works',
                test: () => {
                    window.agentLayoutManager.enableAgentMode();
                    const enabled = document.getElementById('agent-mode-indicator') !== null;
                    window.agentLayoutManager.disableAgentMode();
                    return enabled;
                },
                expected: true
            }
        ];
        
        for (const test of tests) {
            try {
                const result = test.test();
                const passed = result === test.expected;
                
                this.testResults.push({
                    category: 'Layout Management',
                    name: test.name,
                    passed,
                    result,
                    expected: test.expected
                });
                
                console.log(`${passed ? '✅' : '❌'} ${test.name}: ${result}`);
            } catch (error) {
                this.testResults.push({
                    category: 'Layout Management',
                    name: test.name,
                    passed: false,
                    result: error.message,
                    expected: test.expected
                });
                
                console.log(`❌ ${test.name}: ${error.message}`);
            }
        }
    }
    
    async testWorkflowManagement() {
        console.log('🔄 Testing Workflow Management...');
        
        if (!window.agentWorkflowManager) {
            console.warn('⚠️ AgentWorkflowManager not available');
            return;
        }
        
        const tests = [
            {
                name: 'Workflow status available',
                test: () => {
                    const status = window.agentWorkflowManager.getStatus();
                    return status && typeof status === 'object';
                },
                expected: true
            },
            {
                name: 'Workflow history available',
                test: () => {
                    const history = window.agentWorkflowManager.getHistory();
                    return Array.isArray(history);
                },
                expected: true
            },
            {
                name: 'UI layout preservation workflow exists',
                test: () => {
                    const status = window.agentWorkflowManager.getStatus();
                    return status.workflows.includes('ui-layout-preservation');
                },
                expected: true
            }
        ];
        
        for (const test of tests) {
            try {
                const result = test.test();
                const passed = result === test.expected;
                
                this.testResults.push({
                    category: 'Workflow Management',
                    name: test.name,
                    passed,
                    result,
                    expected: test.expected
                });
                
                console.log(`${passed ? '✅' : '❌'} ${test.name}: ${result}`);
            } catch (error) {
                this.testResults.push({
                    category: 'Workflow Management',
                    name: test.name,
                    passed: false,
                    result: error.message,
                    expected: test.expected
                });
                
                console.log(`❌ ${test.name}: ${error.message}`);
            }
        }
    }
    
    async testUIPreservation() {
        console.log('🛡️ Testing UI Preservation...');
        
        if (!window.agentUIPreserver) {
            console.warn('⚠️ AgentUIPreserver not available');
            return;
        }
        
        const tests = [
            {
                name: 'UI preserver status available',
                test: () => {
                    const status = window.agentUIPreserver.getStatus();
                    return status && typeof status === 'object';
                },
                expected: true
            },
            {
                name: 'UI preservation start/stop works',
                test: () => {
                    window.agentUIPreserver.startPreservation();
                    const started = document.getElementById('ui-preservation-indicator') !== null;
                    window.agentUIPreserver.endPreservation();
                    const stopped = document.getElementById('ui-preservation-indicator') === null;
                    return started && stopped;
                },
                expected: true
            },
            {
                name: 'Protected elements count > 0',
                test: () => {
                    const status = window.agentUIPreserver.getStatus();
                    return status.protectedElements > 0;
                },
                expected: true
            }
        ];
        
        for (const test of tests) {
            try {
                const result = test.test();
                const passed = result === test.expected;
                
                this.testResults.push({
                    category: 'UI Preservation',
                    name: test.name,
                    passed,
                    result,
                    expected: test.expected
                });
                
                console.log(`${passed ? '✅' : '❌'} ${test.name}: ${result}`);
            } catch (error) {
                this.testResults.push({
                    category: 'UI Preservation',
                    name: test.name,
                    passed: false,
                    result: error.message,
                    expected: test.expected
                });
                
                console.log(`❌ ${test.name}: ${error.message}`);
            }
        }
    }
    
    async testAgentAutomation() {
        console.log('🤖 Testing Agent Automation...');
        
        if (!window.agentAutomation) {
            console.warn('⚠️ AgentAutomation not available');
            return;
        }
        
        const tests = [
            {
                name: 'Agent automation status available',
                test: () => {
                    const status = window.agentAutomation.getStatus();
                    return status && typeof status === 'object';
                },
                expected: true
            },
            {
                name: 'Agent automation initialized',
                test: () => {
                    const status = window.agentAutomation.getStatus();
                    return status.isInitialized === true;
                },
                expected: true
            },
            {
                name: 'Detailed status available',
                test: () => {
                    const status = window.agentAutomation.getDetailedStatus();
                    return status && typeof status === 'object';
                },
                expected: true
            }
        ];
        
        for (const test of tests) {
            try {
                const result = test.test();
                const passed = result === test.expected;
                
                this.testResults.push({
                    category: 'Agent Automation',
                    name: test.name,
                    passed,
                    result,
                    expected: test.expected
                });
                
                console.log(`${passed ? '✅' : '❌'} ${test.name}: ${result}`);
            } catch (error) {
                this.testResults.push({
                    category: 'Agent Automation',
                    name: test.name,
                    passed: false,
                    result: error.message,
                    expected: test.expected
                });
                
                console.log(`❌ ${test.name}: ${error.message}`);
            }
        }
    }
    
    async testIntegration() {
        console.log('🔧 Testing Integration...');
        
        const tests = [
            {
                name: 'All modules work together',
                test: () => {
                    const layout = window.agentLayoutManager?.detectCurrentLayout();
                    const workflow = window.agentWorkflowManager?.getStatus();
                    const ui = window.agentUIPreserver?.getStatus();
                    const automation = window.agentAutomation?.getStatus();
                    
                    return layout && workflow && ui && automation;
                },
                expected: true
            },
            {
                name: 'Event system works',
                test: () => {
                    let eventReceived = false;
                    
                    const handler = () => { eventReceived = true; };
                    window.addEventListener('agent-test-event', handler);
                    window.dispatchEvent(new CustomEvent('agent-test-event'));
                    window.removeEventListener('agent-test-event', handler);
                    
                    return eventReceived;
                },
                expected: true
            },
            {
                name: 'DOM manipulation safe',
                test: () => {
                    const originalHTML = document.body.innerHTML;
                    
                    // Try to manipulate DOM
                    const testDiv = document.createElement('div');
                    testDiv.id = 'agent-test-div';
                    document.body.appendChild(testDiv);
                    
                    const added = document.getElementById('agent-test-div') !== null;
                    document.body.removeChild(testDiv);
                    
                    const restored = document.body.innerHTML === originalHTML;
                    
                    return added && restored;
                },
                expected: true
            }
        ];
        
        for (const test of tests) {
            try {
                const result = test.test();
                const passed = result === test.expected;
                
                this.testResults.push({
                    category: 'Integration',
                    name: test.name,
                    passed,
                    result,
                    expected: test.expected
                });
                
                console.log(`${passed ? '✅' : '❌'} ${test.name}: ${result}`);
            } catch (error) {
                this.testResults.push({
                    category: 'Integration',
                    name: test.name,
                    passed: false,
                    result: error.message,
                    expected: test.expected
                });
                
                console.log(`❌ ${test.name}: ${error.message}`);
            }
        }
    }
    
    displayResults() {
        console.log('\n📊 Test Results Summary:');
        console.log('========================');
        
        const categories = [...new Set(this.testResults.map(r => r.category))];
        
        categories.forEach(category => {
            const categoryResults = this.testResults.filter(r => r.category === category);
            const passed = categoryResults.filter(r => r.passed).length;
            const total = categoryResults.length;
            
            console.log(`\n${category}: ${passed}/${total} passed`);
            
            categoryResults.forEach(result => {
                const status = result.passed ? '✅' : '❌';
                console.log(`  ${status} ${result.name}`);
                if (!result.passed) {
                    console.log(`    Expected: ${result.expected}, Got: ${result.result}`);
                }
            });
        });
        
        const totalPassed = this.testResults.filter(r => r.passed).length;
        const totalTests = this.testResults.length;
        const percentage = Math.round((totalPassed / totalTests) * 100);
        
        console.log(`\n🎯 Overall: ${totalPassed}/${totalTests} tests passed (${percentage}%)`);
        
        if (percentage >= 90) {
            console.log('🎉 Excellent! Agent Automation is working well.');
        } else if (percentage >= 70) {
            console.log('👍 Good! Agent Automation is mostly working.');
        } else {
            console.log('⚠️ Needs improvement. Some tests failed.');
        }
        
        // Store results for external access
        window.agentTestResults = {
            total: totalTests,
            passed: totalPassed,
            percentage,
            results: this.testResults
        };
    }
    
    // Quick test methods
    async quickTest() {
        console.log('⚡ Running Quick Test...');
        
        const tests = [
            () => !!window.agentAutomation,
            () => !!window.agentLayoutManager,
            () => !!window.agentWorkflowManager,
            () => !!window.agentUIPreserver
        ];
        
        const results = tests.map(test => test());
        const allPassed = results.every(r => r);
        
        console.log(`${allPassed ? '✅' : '❌'} Quick Test: ${allPassed ? 'PASSED' : 'FAILED'}`);
        return allPassed;
    }
    
    async stressTest() {
        console.log('💪 Running Stress Test...');
        
        const iterations = 10;
        let successCount = 0;
        
        for (let i = 0; i < iterations; i++) {
            try {
                // Test rapid start/stop
                window.agentUIPreserver.startPreservation();
                window.agentLayoutManager.enableAgentMode();
                
                // Wait a bit
                await new Promise(resolve => setTimeout(resolve, 100));
                
                window.agentLayoutManager.disableAgentMode();
                window.agentUIPreserver.endPreservation();
                
                successCount++;
            } catch (error) {
                console.warn(`Stress test iteration ${i + 1} failed:`, error);
            }
        }
        
        const successRate = (successCount / iterations) * 100;
        console.log(`💪 Stress Test: ${successCount}/${iterations} successful (${successRate.toFixed(1)}%)`);
        
        return successRate >= 80;
    }
}

// Auto-run tests when loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for modules to load
    setTimeout(() => {
        const tester = new AgentAutomationTest();
        
        // Run quick test first
        tester.quickTest().then(quickPassed => {
            if (quickPassed) {
                console.log('🚀 Quick test passed, running full test suite...');
                tester.runAllTests();
            } else {
                console.log('❌ Quick test failed, skipping full test suite');
            }
        });
    }, 1000);
});

// Export for external use
window.AgentAutomationTest = AgentAutomationTest;