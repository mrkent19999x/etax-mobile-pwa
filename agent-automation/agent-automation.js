/**
 * Agent Automation - Main orchestrator cho agent tự động
 * Kết hợp tất cả các module để tạo hệ thống agent hoàn chỉnh
 */

class AgentAutomation {
    constructor() {
        this.modules = {
            layoutManager: null,
            workflowManager: null,
            uiPreserver: null
        };
        
        this.isInitialized = false;
        this.isRunning = false;
        this.currentTask = null;
        
        this.init();
    }
    
    async init() {
        console.log('🤖 Agent Automation initializing...');
        
        try {
            await this.loadModules();
            this.setupEventListeners();
            this.isInitialized = true;
            
            console.log('✅ Agent Automation initialized successfully');
        } catch (error) {
            console.error('❌ Agent Automation initialization failed:', error);
        }
    }
    
    async loadModules() {
        // Load modules in order
        this.modules.layoutManager = window.agentLayoutManager;
        this.modules.workflowManager = window.agentWorkflowManager;
        this.modules.uiPreserver = window.agentUIPreserver;
        
        // Wait for modules to be ready
        await this.waitForModules();
    }
    
    async waitForModules() {
        const maxWait = 5000; // 5 seconds
        const startTime = Date.now();
        
        while (Date.now() - startTime < maxWait) {
            if (this.modules.layoutManager && 
                this.modules.workflowManager && 
                this.modules.uiPreserver) {
                return true;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        throw new Error('Modules failed to load within timeout');
    }
    
    setupEventListeners() {
        // Listen for automation events
        window.addEventListener('agent-automation-start', (e) => {
            this.startAutomation(e.detail);
        });
        
        window.addEventListener('agent-automation-stop', () => {
            this.stopAutomation();
        });
        
        // Listen for module events
        window.addEventListener('workflow-completed', (e) => {
            this.handleWorkflowCompleted(e.detail);
        });
        
        window.addEventListener('workflow-failed', (e) => {
            this.handleWorkflowFailed(e.detail);
        });
    }
    
    /**
     * Start agent automation
     */
    async startAutomation(taskConfig) {
        if (this.isRunning) {
            console.warn('⚠️ Agent automation is already running');
            return false;
        }
        
        if (!this.isInitialized) {
            console.error('❌ Agent automation not initialized');
            return false;
        }
        
        console.log('🚀 Starting agent automation...', taskConfig);
        
        this.isRunning = true;
        this.currentTask = taskConfig;
        
        try {
            // Step 1: Start UI preservation
            await this.startUIPreservation();
            
            // Step 2: Detect and set appropriate layout
            await this.setupLayout();
            
            // Step 3: Execute main workflow
            await this.executeMainWorkflow(taskConfig);
            
            console.log('✅ Agent automation completed successfully');
            return true;
            
        } catch (error) {
            console.error('❌ Agent automation failed:', error);
            await this.handleError(error);
            return false;
        } finally {
            this.isRunning = false;
            this.currentTask = null;
        }
    }
    
    /**
     * Stop agent automation
     */
    async stopAutomation() {
        if (!this.isRunning) {
            console.warn('⚠️ Agent automation is not running');
            return;
        }
        
        console.log('🛑 Stopping agent automation...');
        
        try {
            // Stop current workflow
            if (this.modules.workflowManager) {
                this.modules.workflowManager.stopWorkflow();
            }
            
            // End UI preservation
            if (this.modules.uiPreserver) {
                this.modules.uiPreserver.endPreservation();
            }
            
            // Reset layout
            if (this.modules.layoutManager) {
                this.modules.layoutManager.disableAgentMode();
            }
            
            this.isRunning = false;
            this.currentTask = null;
            
            console.log('✅ Agent automation stopped');
        } catch (error) {
            console.error('❌ Error stopping automation:', error);
        }
    }
    
    /**
     * Start UI preservation
     */
    async startUIPreservation() {
        console.log('🛡️ Starting UI preservation...');
        
        if (this.modules.uiPreserver) {
            this.modules.uiPreserver.startPreservation();
        }
        
        // Dispatch event
        window.dispatchEvent(new CustomEvent('agent-start'));
    }
    
    /**
     * Setup layout for agent task
     */
    async setupLayout() {
        console.log('📱 Setting up layout...');
        
        if (this.modules.layoutManager) {
            // Detect current layout
            const layout = this.modules.layoutManager.detectCurrentLayout();
            
            // Enable agent mode
            this.modules.layoutManager.enableAgentMode();
            
            // Apply appropriate layout preset
            if (layout && layout.preset) {
                this.modules.layoutManager.applyLayout(layout.preset);
            }
        }
    }
    
    /**
     * Execute main workflow
     */
    async executeMainWorkflow(taskConfig) {
        console.log('🔄 Executing main workflow...');
        
        if (!this.modules.workflowManager) {
            throw new Error('Workflow manager not available');
        }
        
        // Determine workflow based on task type
        const workflowName = this.determineWorkflow(taskConfig);
        
        // Execute workflow
        const success = await this.modules.workflowManager.startWorkflow(workflowName, taskConfig);
        
        if (!success) {
            throw new Error(`Workflow ${workflowName} failed`);
        }
    }
    
    /**
     * Determine appropriate workflow for task
     */
    determineWorkflow(taskConfig) {
        const taskType = taskConfig.type || 'default';
        
        switch (taskType) {
            case 'ui-development':
                return 'ui-layout-preservation';
            case 'mobile-development':
                return 'mobile-first-development';
            case 'sync-operation':
                return 'cross-device-sync';
            case 'pwa-maintenance':
                return 'pwa-maintenance';
            default:
                return 'ui-layout-preservation';
        }
    }
    
    /**
     * Handle workflow completion
     */
    handleWorkflowCompleted(detail) {
        console.log('✅ Workflow completed:', detail);
        
        // Dispatch completion event
        window.dispatchEvent(new CustomEvent('agent-automation-completed', {
            detail: {
                task: this.currentTask,
                result: detail
            }
        }));
    }
    
    /**
     * Handle workflow failure
     */
    handleWorkflowFailed(detail) {
        console.error('❌ Workflow failed:', detail);
        
        // Dispatch failure event
        window.dispatchEvent(new CustomEvent('agent-automation-failed', {
            detail: {
                task: this.currentTask,
                error: detail
            }
        }));
    }
    
    /**
     * Handle errors during automation
     */
    async handleError(error) {
        console.error('🚨 Handling automation error:', error);
        
        try {
            // Try to restore UI state
            if (this.modules.uiPreserver) {
                this.modules.uiPreserver.forceRestore();
            }
            
            // Reset layout
            if (this.modules.layoutManager) {
                this.modules.layoutManager.disableAgentMode();
            }
            
        } catch (restoreError) {
            console.error('❌ Error during restore:', restoreError);
        }
        
        // Dispatch error event
        window.dispatchEvent(new CustomEvent('agent-automation-error', {
            detail: {
                task: this.currentTask,
                error: error.message
            }
        }));
    }
    
    /**
     * Get automation status
     */
    getStatus() {
        return {
            isInitialized: this.isInitialized,
            isRunning: this.isRunning,
            currentTask: this.currentTask,
            modules: {
                layoutManager: !!this.modules.layoutManager,
                workflowManager: !!this.modules.workflowManager,
                uiPreserver: !!this.modules.uiPreserver
            }
        };
    }
    
    /**
     * Get detailed status from all modules
     */
    getDetailedStatus() {
        const status = this.getStatus();
        
        if (this.modules.layoutManager) {
            status.layoutManager = this.modules.layoutManager.getLayoutInfo();
        }
        
        if (this.modules.workflowManager) {
            status.workflowManager = this.modules.workflowManager.getStatus();
        }
        
        if (this.modules.uiPreserver) {
            status.uiPreserver = this.modules.uiPreserver.getStatus();
        }
        
        return status;
    }
    
    /**
     * Execute quick task without full automation
     */
    async executeQuickTask(taskFunction, options = {}) {
        console.log('⚡ Executing quick task...');
        
        const startTime = Date.now();
        
        try {
            // Start minimal preservation
            if (options.preserveUI !== false) {
                this.startUIPreservation();
            }
            
            // Execute task
            const result = await taskFunction();
            
            // End preservation
            if (options.preserveUI !== false) {
                this.modules.uiPreserver?.endPreservation();
            }
            
            const duration = Date.now() - startTime;
            console.log(`✅ Quick task completed in ${duration}ms`);
            
            return result;
            
        } catch (error) {
            console.error('❌ Quick task failed:', error);
            throw error;
        }
    }
}

// Auto-initialize
window.agentAutomation = new AgentAutomation();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AgentAutomation;
}