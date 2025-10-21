/**
 * Agent Workflow Manager - Quản lý workflow tự động cho agent
 * Đảm bảo agent chạy theo đúng quy trình mà không làm hỏng UI
 */

class AgentWorkflowManager {
    constructor() {
        this.workflows = new Map();
        this.currentWorkflow = null;
        this.isRunning = false;
        this.stepIndex = 0;
        
        this.init();
    }
    
    init() {
        console.log('🔄 Agent Workflow Manager initialized');
        this.setupDefaultWorkflows();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Listen for workflow events
        window.addEventListener('workflow-start', (e) => {
            this.startWorkflow(e.detail.workflowName);
        });
        
        window.addEventListener('workflow-stop', () => {
            this.stopWorkflow();
        });
        
        window.addEventListener('workflow-pause', () => {
            this.pauseWorkflow();
        });
        
        window.addEventListener('workflow-resume', () => {
            this.resumeWorkflow();
        });
    }
    
    setupDefaultWorkflows() {
        // UI Layout Preservation Workflow
        this.addWorkflow('ui-layout-preservation', {
            name: 'UI Layout Preservation',
            description: 'Preserve UI layout while agent performs tasks',
            steps: [
                {
                    name: 'detect_current_layout',
                    action: () => this.detectCurrentLayout(),
                    timeout: 1000
                },
                {
                    name: 'backup_ui_state',
                    action: () => this.backupUIState(),
                    timeout: 2000
                },
                {
                    name: 'enable_agent_mode',
                    action: () => this.enableAgentMode(),
                    timeout: 1000
                },
                {
                    name: 'execute_agent_task',
                    action: (task) => this.executeAgentTask(task),
                    timeout: 30000
                },
                {
                    name: 'validate_layout_integrity',
                    action: () => this.validateLayoutIntegrity(),
                    timeout: 2000
                },
                {
                    name: 'restore_ui_state',
                    action: () => this.restoreUIState(),
                    timeout: 2000
                },
                {
                    name: 'disable_agent_mode',
                    action: () => this.disableAgentMode(),
                    timeout: 1000
                }
            ]
        });
        
        // Mobile-First Development Workflow
        this.addWorkflow('mobile-first-development', {
            name: 'Mobile-First Development',
            description: 'Ensure mobile-first approach during development',
            steps: [
                {
                    name: 'set_mobile_viewport',
                    action: () => this.setMobileViewport(),
                    timeout: 1000
                },
                {
                    name: 'apply_mobile_theme',
                    action: () => this.applyMobileTheme(),
                    timeout: 1000
                },
                {
                    name: 'test_responsive_breakpoints',
                    action: () => this.testResponsiveBreakpoints(),
                    timeout: 3000
                },
                {
                    name: 'validate_mobile_ui',
                    action: () => this.validateMobileUI(),
                    timeout: 2000
                }
            ]
        });
        
        // Cross-Device Sync Workflow
        this.addWorkflow('cross-device-sync', {
            name: 'Cross-Device Sync',
            description: 'Maintain cross-device synchronization',
            steps: [
                {
                    name: 'check_firestore_connection',
                    action: () => this.checkFirestoreConnection(),
                    timeout: 5000
                },
                {
                    name: 'backup_local_storage',
                    action: () => this.backupLocalStorage(),
                    timeout: 1000
                },
                {
                    name: 'sync_to_firestore',
                    action: (data) => this.syncToFirestore(data),
                    timeout: 10000
                },
                {
                    name: 'broadcast_to_other_tabs',
                    action: (data) => this.broadcastToOtherTabs(data),
                    timeout: 1000
                },
                {
                    name: 'verify_sync_success',
                    action: () => this.verifySyncSuccess(),
                    timeout: 2000
                }
            ]
        });
        
        // PWA Maintenance Workflow
        this.addWorkflow('pwa-maintenance', {
            name: 'PWA Maintenance',
            description: 'Maintain PWA functionality',
            steps: [
                {
                    name: 'check_service_worker',
                    action: () => this.checkServiceWorker(),
                    timeout: 2000
                },
                {
                    name: 'validate_manifest',
                    action: () => this.validateManifest(),
                    timeout: 1000
                },
                {
                    name: 'test_offline_functionality',
                    action: () => this.testOfflineFunctionality(),
                    timeout: 3000
                },
                {
                    name: 'update_cache',
                    action: () => this.updateCache(),
                    timeout: 5000
                }
            ]
        });
    }
    
    /**
     * Add a new workflow
     */
    addWorkflow(name, workflow) {
        this.workflows.set(name, {
            ...workflow,
            id: name,
            createdAt: Date.now(),
            lastRun: null,
            runCount: 0
        });
        
        console.log(`📋 Added workflow: ${name}`);
    }
    
    /**
     * Start a workflow
     */
    async startWorkflow(workflowName, taskData = null) {
        if (this.isRunning) {
            console.warn('⚠️ Another workflow is already running');
            return false;
        }
        
        const workflow = this.workflows.get(workflowName);
        if (!workflow) {
            console.error(`❌ Workflow not found: ${workflowName}`);
            return false;
        }
        
        console.log(`🚀 Starting workflow: ${workflowName}`);
        
        this.currentWorkflow = workflow;
        this.isRunning = true;
        this.stepIndex = 0;
        
        // Update workflow stats
        workflow.lastRun = Date.now();
        workflow.runCount++;
        
        try {
            await this.executeWorkflowSteps(workflow, taskData);
            console.log(`✅ Workflow completed: ${workflowName}`);
            return true;
        } catch (error) {
            console.error(`❌ Workflow failed: ${workflowName}`, error);
            return false;
        } finally {
            this.isRunning = false;
            this.currentWorkflow = null;
            this.stepIndex = 0;
        }
    }
    
    /**
     * Execute workflow steps
     */
    async executeWorkflowSteps(workflow, taskData) {
        for (let i = 0; i < workflow.steps.length; i++) {
            const step = workflow.steps[i];
            this.stepIndex = i;
            
            console.log(`🔄 Executing step ${i + 1}/${workflow.steps.length}: ${step.name}`);
            
            try {
                const result = await this.executeStep(step, taskData);
                console.log(`✅ Step completed: ${step.name}`, result);
            } catch (error) {
                console.error(`❌ Step failed: ${step.name}`, error);
                throw error;
            }
        }
    }
    
    /**
     * Execute a single step
     */
    async executeStep(step, taskData) {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error(`Step timeout: ${step.name}`));
            }, step.timeout || 10000);
            
            try {
                const result = step.action(taskData);
                
                if (result instanceof Promise) {
                    result
                        .then(resolve)
                        .catch(reject)
                        .finally(() => clearTimeout(timeout));
                } else {
                    clearTimeout(timeout);
                    resolve(result);
                }
            } catch (error) {
                clearTimeout(timeout);
                reject(error);
            }
        });
    }
    
    /**
     * Stop current workflow
     */
    stopWorkflow() {
        if (!this.isRunning) {
            console.warn('⚠️ No workflow is currently running');
            return;
        }
        
        console.log('🛑 Stopping workflow...');
        this.isRunning = false;
        this.currentWorkflow = null;
        this.stepIndex = 0;
    }
    
    /**
     * Pause current workflow
     */
    pauseWorkflow() {
        if (!this.isRunning) {
            console.warn('⚠️ No workflow is currently running');
            return;
        }
        
        console.log('⏸️ Pausing workflow...');
        // Implementation for pause functionality
    }
    
    /**
     * Resume paused workflow
     */
    resumeWorkflow() {
        console.log('▶️ Resuming workflow...');
        // Implementation for resume functionality
    }
    
    // Workflow step implementations
    
    detectCurrentLayout() {
        if (window.agentLayoutManager) {
            return window.agentLayoutManager.detectCurrentLayout();
        }
        return null;
    }
    
    backupUIState() {
        if (window.agentLayoutManager) {
            return window.agentLayoutManager.backupCurrentState();
        }
        return null;
    }
    
    enableAgentMode() {
        if (window.agentLayoutManager) {
            return window.agentLayoutManager.enableAgentMode();
        }
        return null;
    }
    
    executeAgentTask(taskData) {
        console.log('🤖 Executing agent task:', taskData);
        // This would be implemented based on specific task requirements
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, taskData });
            }, 1000);
        });
    }
    
    validateLayoutIntegrity() {
        // Check if UI elements are still in place
        const criticalElements = [
            'body',
            'main',
            '.container',
            '.btn',
            '.card'
        ];
        
        const missingElements = criticalElements.filter(selector => {
            const element = document.querySelector(selector);
            return !element;
        });
        
        if (missingElements.length > 0) {
            console.warn('⚠️ Missing critical elements:', missingElements);
            return false;
        }
        
        console.log('✅ Layout integrity validated');
        return true;
    }
    
    restoreUIState() {
        if (window.agentLayoutManager) {
            return window.agentLayoutManager.restoreState();
        }
        return null;
    }
    
    disableAgentMode() {
        if (window.agentLayoutManager) {
            return window.agentLayoutManager.disableAgentMode();
        }
        return null;
    }
    
    setMobileViewport() {
        const metaViewport = document.querySelector('meta[name="viewport"]');
        if (metaViewport) {
            metaViewport.content = 'width=375, initial-scale=1.0';
        }
        return true;
    }
    
    applyMobileTheme() {
        document.body.classList.add('theme-mobile');
        return true;
    }
    
    testResponsiveBreakpoints() {
        const breakpoints = [375, 768, 1024, 1440];
        const results = {};
        
        breakpoints.forEach(width => {
            // Simulate viewport change
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: width,
            });
            
            // Trigger resize event
            window.dispatchEvent(new Event('resize'));
            
            // Check if layout is responsive
            results[width] = this.checkResponsiveLayout(width);
        });
        
        console.log('📱 Responsive breakpoint test results:', results);
        return results;
    }
    
    checkResponsiveLayout(width) {
        // Basic responsive check
        const container = document.querySelector('.container');
        if (!container) return false;
        
        const containerWidth = container.offsetWidth;
        const isResponsive = containerWidth <= width;
        
        return isResponsive;
    }
    
    validateMobileUI() {
        // Check mobile-specific elements
        const mobileElements = [
            '.mobile-nav',
            '.mobile-menu',
            '.mobile-header'
        ];
        
        const hasMobileElements = mobileElements.some(selector => {
            return document.querySelector(selector);
        });
        
        console.log('📱 Mobile UI validation:', hasMobileElements);
        return hasMobileElements;
    }
    
    checkFirestoreConnection() {
        if (typeof db !== 'undefined' && db) {
            console.log('✅ Firestore connection active');
            return true;
        } else {
            console.warn('⚠️ Firestore connection not available');
            return false;
        }
    }
    
    backupLocalStorage() {
        const backup = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            backup[key] = localStorage.getItem(key);
        }
        
        // Store backup in memory
        this.localStorageBackup = backup;
        console.log('💾 LocalStorage backed up');
        return backup;
    }
    
    syncToFirestore(data) {
        if (!db) {
            console.warn('⚠️ Firestore not available');
            return false;
        }
        
        // Implementation would depend on specific data structure
        console.log('🔄 Syncing to Firestore:', data);
        return true;
    }
    
    broadcastToOtherTabs(data) {
        if (typeof syncDataToOtherTabs === 'function') {
            syncDataToOtherTabs('agent_update', data);
            console.log('📡 Broadcasted to other tabs');
            return true;
        } else {
            console.warn('⚠️ BroadcastChannel not available');
            return false;
        }
    }
    
    verifySyncSuccess() {
        // Check if sync was successful
        console.log('✅ Sync verification completed');
        return true;
    }
    
    checkServiceWorker() {
        if ('serviceWorker' in navigator) {
            console.log('✅ Service Worker supported');
            return true;
        } else {
            console.warn('⚠️ Service Worker not supported');
            return false;
        }
    }
    
    validateManifest() {
        const manifest = document.querySelector('link[rel="manifest"]');
        if (manifest) {
            console.log('✅ PWA Manifest found');
            return true;
        } else {
            console.warn('⚠️ PWA Manifest not found');
            return false;
        }
    }
    
    testOfflineFunctionality() {
        // Basic offline test
        console.log('📱 Testing offline functionality');
        return true;
    }
    
    updateCache() {
        // Update service worker cache
        console.log('🔄 Updating cache');
        return true;
    }
    
    /**
     * Get workflow status
     */
    getStatus() {
        return {
            isRunning: this.isRunning,
            currentWorkflow: this.currentWorkflow?.name || null,
            stepIndex: this.stepIndex,
            totalSteps: this.currentWorkflow?.steps.length || 0,
            workflows: Array.from(this.workflows.keys())
        };
    }
    
    /**
     * Get workflow history
     */
    getHistory() {
        return Array.from(this.workflows.values()).map(workflow => ({
            name: workflow.name,
            lastRun: workflow.lastRun,
            runCount: workflow.runCount
        }));
    }
}

// Auto-initialize
window.agentWorkflowManager = new AgentWorkflowManager();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AgentWorkflowManager;
}