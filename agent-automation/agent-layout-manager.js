/**
 * Agent Layout Manager - Tự động quản lý UI/UX layout cho agent
 * Đảm bảo agent có thể chạy tự động mà không làm hỏng UI
 */

class AgentLayoutManager {
    constructor() {
        this.currentLayout = null;
        this.layoutHistory = [];
        this.isAgentMode = false;
        
        // Layout presets cho từng loại page
        this.layoutPresets = {
            'mobile-first': {
                viewport: '375x667',
                breakpoints: [768, 1024],
                theme: 'mobile',
                css: 'mobile-first.css'
            },
            'admin-panel': {
                viewport: '1200x800',
                breakpoints: [1024, 1440],
                theme: 'admin',
                css: 'admin-theme.css'
            },
            'user-interface': {
                viewport: '375x667',
                breakpoints: [768, 1024],
                theme: 'user',
                css: 'user-theme.css'
            },
            'desktop': {
                viewport: '1920x1080',
                breakpoints: [1440, 1920],
                theme: 'desktop',
                css: 'desktop-theme.css'
            }
        };
        
        this.init();
    }
    
    init() {
        console.log('🤖 Agent Layout Manager initialized');
        this.setupEventListeners();
        this.detectCurrentLayout();
    }
    
    setupEventListeners() {
        // Listen for agent mode changes
        window.addEventListener('agent-mode-start', () => {
            this.enableAgentMode();
        });
        
        window.addEventListener('agent-mode-end', () => {
            this.disableAgentMode();
        });
        
        // Listen for layout changes
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }
    
    /**
     * Detect current layout based on page type and viewport
     */
    detectCurrentLayout() {
        const pageType = this.getPageType();
        const viewport = this.getViewportSize();
        
        this.currentLayout = {
            pageType,
            viewport,
            timestamp: Date.now(),
            preset: this.getMatchingPreset(pageType, viewport)
        };
        
        console.log('📱 Detected layout:', this.currentLayout);
        return this.currentLayout;
    }
    
    getPageType() {
        const path = window.location.pathname;
        
        if (path.includes('admin')) return 'admin-panel';
        if (path.includes('login')) return 'mobile-first';
        if (path.includes('index')) return 'user-interface';
        
        return 'mobile-first'; // Default
    }
    
    getViewportSize() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }
    
    getMatchingPreset(pageType, viewport) {
        const preset = this.layoutPresets[pageType];
        
        // Determine if mobile or desktop based on viewport
        if (viewport.width < 768) {
            return { ...preset, mode: 'mobile' };
        } else if (viewport.width < 1024) {
            return { ...preset, mode: 'tablet' };
        } else {
            return { ...preset, mode: 'desktop' };
        }
    }
    
    /**
     * Enable agent mode - backup current state
     */
    enableAgentMode() {
        console.log('🤖 Enabling agent mode...');
        
        this.isAgentMode = true;
        this.backupCurrentState();
        
        // Add agent mode indicator
        this.addAgentModeIndicator();
        
        // Disable user interactions temporarily
        this.disableUserInteractions();
    }
    
    /**
     * Disable agent mode - restore state
     */
    disableAgentMode() {
        console.log('🤖 Disabling agent mode...');
        
        this.isAgentMode = false;
        this.restoreState();
        
        // Remove agent mode indicator
        this.removeAgentModeIndicator();
        
        // Re-enable user interactions
        this.enableUserInteractions();
    }
    
    /**
     * Backup current UI state
     */
    backupCurrentState() {
        const backup = {
            layout: this.captureLayout(),
            styles: this.captureStyles(),
            components: this.captureComponents(),
            timestamp: Date.now()
        };
        
        this.layoutHistory.push(backup);
        
        // Keep only last 5 backups
        if (this.layoutHistory.length > 5) {
            this.layoutHistory.shift();
        }
        
        console.log('💾 UI state backed up');
    }
    
    captureLayout() {
        return {
            viewport: this.getViewportSize(),
            scrollPosition: {
                x: window.scrollX,
                y: window.scrollY
            },
            activeElement: document.activeElement?.tagName,
            bodyClasses: document.body.className
        };
    }
    
    captureStyles() {
        const styles = {};
        const styleSheets = document.styleSheets;
        
        for (let i = 0; i < styleSheets.length; i++) {
            try {
                const sheet = styleSheets[i];
                if (sheet.href) {
                    styles[sheet.href] = 'external';
                } else {
                    styles[`inline-${i}`] = sheet.ownerNode?.textContent || '';
                }
            } catch (e) {
                // Skip cross-origin stylesheets
            }
        }
        
        return styles;
    }
    
    captureComponents() {
        const components = {};
        const elements = document.querySelectorAll('[class*="card"], [class*="btn"], [class*="form"]');
        
        elements.forEach((el, index) => {
            components[`component-${index}`] = {
                tagName: el.tagName,
                className: el.className,
                id: el.id,
                textContent: el.textContent?.substring(0, 100)
            };
        });
        
        return components;
    }
    
    /**
     * Restore UI state from backup
     */
    restoreState() {
        if (this.layoutHistory.length === 0) {
            console.warn('⚠️ No backup to restore');
            return;
        }
        
        const backup = this.layoutHistory[this.layoutHistory.length - 1];
        
        this.restoreLayout(backup.layout);
        this.restoreStyles(backup.styles);
        this.restoreComponents(backup.components);
        
        console.log('🔄 UI state restored');
    }
    
    restoreLayout(layout) {
        // Restore scroll position
        window.scrollTo(layout.scrollPosition.x, layout.scrollPosition.y);
        
        // Restore body classes
        document.body.className = layout.bodyClasses;
    }
    
    restoreStyles(styles) {
        // Styles are usually not modified by agent
        // This is mainly for logging
        console.log('🎨 Styles preserved:', Object.keys(styles).length, 'stylesheets');
    }
    
    restoreComponents(components) {
        // Components are usually not modified by agent
        // This is mainly for logging
        console.log('🧩 Components preserved:', Object.keys(components).length, 'components');
    }
    
    /**
     * Apply specific layout preset
     */
    applyLayout(preset) {
        console.log('📱 Applying layout preset:', preset);
        
        // Set viewport meta tag
        this.setViewport(preset.viewport);
        
        // Apply theme
        this.applyTheme(preset.theme);
        
        // Load CSS if specified
        if (preset.css) {
            this.loadCSS(preset.css);
        }
        
        // Update current layout
        this.currentLayout.preset = preset;
    }
    
    setViewport(viewport) {
        const metaViewport = document.querySelector('meta[name="viewport"]');
        if (metaViewport) {
            metaViewport.content = `width=${viewport.split('x')[0]}, initial-scale=1.0`;
        }
    }
    
    applyTheme(theme) {
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add(`theme-${theme}`);
    }
    
    loadCSS(cssFile) {
        // Check if CSS already loaded
        if (document.querySelector(`link[href*="${cssFile}"]`)) {
            return;
        }
        
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `css/${cssFile}`;
        document.head.appendChild(link);
    }
    
    /**
     * Handle window resize
     */
    handleResize() {
        if (this.isAgentMode) {
            // Don't change layout during agent mode
            return;
        }
        
        const newLayout = this.detectCurrentLayout();
        this.applyLayout(newLayout.preset);
    }
    
    /**
     * Add agent mode indicator
     */
    addAgentModeIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'agent-mode-indicator';
        indicator.innerHTML = '🤖 Agent Mode Active';
        indicator.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #e74c3c;
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 9999;
            font-family: monospace;
        `;
        document.body.appendChild(indicator);
    }
    
    removeAgentModeIndicator() {
        const indicator = document.getElementById('agent-mode-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    /**
     * Disable user interactions during agent mode
     */
    disableUserInteractions() {
        document.body.style.pointerEvents = 'none';
        document.body.style.userSelect = 'none';
    }
    
    enableUserInteractions() {
        document.body.style.pointerEvents = 'auto';
        document.body.style.userSelect = 'auto';
    }
    
    /**
     * Get current layout info for debugging
     */
    getLayoutInfo() {
        return {
            current: this.currentLayout,
            history: this.layoutHistory,
            isAgentMode: this.isAgentMode,
            presets: this.layoutPresets
        };
    }
}

// Auto-initialize
window.agentLayoutManager = new AgentLayoutManager();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AgentLayoutManager;
}