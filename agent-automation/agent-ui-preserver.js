/**
 * Agent UI Preserver - Bảo vệ UI/UX layout khi agent chạy
 * Đảm bảo agent không làm hỏng giao diện người dùng
 */

class AgentUIPreserver {
    constructor() {
        this.uiSnapshots = new Map();
        this.protectedElements = new Set();
        this.isPreservationActive = false;
        this.originalStyles = new Map();
        
        this.init();
    }
    
    init() {
        console.log('🛡️ Agent UI Preserver initialized');
        this.setupProtectedElements();
        this.setupMutationObserver();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Listen for agent events
        window.addEventListener('agent-start', () => {
            this.startPreservation();
        });
        
        window.addEventListener('agent-end', () => {
            this.endPreservation();
        });
        
        // Listen for layout changes
        window.addEventListener('beforeunload', () => {
            this.saveCurrentState();
        });
    }
    
    setupProtectedElements() {
        // Define critical UI elements that should be protected
        const criticalSelectors = [
            'body',
            'main',
            '.container',
            '.header',
            '.footer',
            '.navigation',
            '.sidebar',
            '.content',
            '.btn',
            '.card',
            '.form',
            '.modal',
            '.alert',
            '.toast'
        ];
        
        criticalSelectors.forEach(selector => {
            this.protectedElements.add(selector);
        });
    }
    
    setupMutationObserver() {
        // Watch for DOM changes during agent mode
        this.mutationObserver = new MutationObserver((mutations) => {
            if (this.isPreservationActive) {
                this.handleDOMChanges(mutations);
            }
        });
        
        this.mutationObserver.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeOldValue: true
        });
    }
    
    /**
     * Start UI preservation mode
     */
    startPreservation() {
        console.log('🛡️ Starting UI preservation...');
        
        this.isPreservationActive = true;
        this.createUISnapshot();
        this.protectCriticalElements();
        this.addPreservationIndicator();
        
        console.log('✅ UI preservation active');
    }
    
    /**
     * End UI preservation mode
     */
    endPreservation() {
        console.log('🛡️ Ending UI preservation...');
        
        this.isPreservationActive = false;
        this.restoreUISnapshot();
        this.unprotectElements();
        this.removePreservationIndicator();
        
        console.log('✅ UI preservation ended');
    }
    
    /**
     * Create a snapshot of current UI state
     */
    createUISnapshot() {
        const snapshot = {
            timestamp: Date.now(),
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            scrollPosition: {
                x: window.scrollX,
                y: window.scrollY
            },
            bodyClasses: document.body.className,
            headStyles: this.captureHeadStyles(),
            criticalElements: this.captureCriticalElements(),
            layout: this.captureLayoutInfo()
        };
        
        this.uiSnapshots.set('current', snapshot);
        console.log('📸 UI snapshot created');
        
        return snapshot;
    }
    
    captureHeadStyles() {
        const styles = {};
        const styleSheets = document.styleSheets;
        
        for (let i = 0; i < styleSheets.length; i++) {
            try {
                const sheet = styleSheets[i];
                if (sheet.href) {
                    styles[sheet.href] = {
                        type: 'external',
                        href: sheet.href,
                        disabled: sheet.disabled
                    };
                } else if (sheet.ownerNode) {
                    styles[`inline-${i}`] = {
                        type: 'inline',
                        content: sheet.ownerNode.textContent,
                        disabled: sheet.disabled
                    };
                }
            } catch (e) {
                // Skip cross-origin stylesheets
                console.warn('⚠️ Cannot access stylesheet:', e.message);
            }
        }
        
        return styles;
    }
    
    captureCriticalElements() {
        const elements = {};
        
        this.protectedElements.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                elements[selector] = {
                    tagName: element.tagName,
                    className: element.className,
                    id: element.id,
                    innerHTML: element.innerHTML.substring(0, 500), // Limit size
                    attributes: this.getElementAttributes(element),
                    computedStyle: this.getElementComputedStyle(element)
                };
            }
        });
        
        return elements;
    }
    
    getElementAttributes(element) {
        const attributes = {};
        for (let attr of element.attributes) {
            attributes[attr.name] = attr.value;
        }
        return attributes;
    }
    
    getElementComputedStyle(element) {
        const computedStyle = window.getComputedStyle(element);
        const importantStyles = {};
        
        // Capture only critical CSS properties
        const criticalProperties = [
            'display', 'position', 'width', 'height',
            'margin', 'padding', 'border', 'background',
            'color', 'font-size', 'font-family',
            'flex', 'grid', 'float', 'clear'
        ];
        
        criticalProperties.forEach(prop => {
            importantStyles[prop] = computedStyle.getPropertyValue(prop);
        });
        
        return importantStyles;
    }
    
    captureLayoutInfo() {
        return {
            bodyMargin: window.getComputedStyle(document.body).margin,
            bodyPadding: window.getComputedStyle(document.body).padding,
            documentHeight: document.documentElement.scrollHeight,
            documentWidth: document.documentElement.scrollWidth
        };
    }
    
    /**
     * Protect critical elements from modification
     */
    protectCriticalElements() {
        this.protectedElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                this.protectElement(element);
            });
        });
    }
    
    protectElement(element) {
        // Store original content
        const originalContent = {
            innerHTML: element.innerHTML,
            className: element.className,
            style: element.style.cssText
        };
        
        this.originalStyles.set(element, originalContent);
        
        // Add protection class
        element.classList.add('agent-protected');
        
        // Add protection attributes
        element.setAttribute('data-agent-protected', 'true');
        element.setAttribute('data-original-content', JSON.stringify(originalContent));
    }
    
    /**
     * Handle DOM changes during agent mode
     */
    handleDOMChanges(mutations) {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                // Check if any protected elements were removed
                mutation.removedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        this.handleProtectedElementRemoval(node);
                    }
                });
            } else if (mutation.type === 'attributes') {
                // Check if protected element attributes were changed
                if (mutation.target.hasAttribute('data-agent-protected')) {
                    this.handleProtectedElementChange(mutation);
                }
            }
        });
    }
    
    handleProtectedElementRemoval(node) {
        // Check if removed node was a protected element
        const isProtected = Array.from(this.protectedElements).some(selector => {
            return node.matches && node.matches(selector);
        });
        
        if (isProtected) {
            console.warn('⚠️ Protected element removed:', node);
            // Could implement auto-restore here
        }
    }
    
    handleProtectedElementChange(mutation) {
        const element = mutation.target;
        const originalContent = this.originalStyles.get(element);
        
        if (originalContent) {
            // Check if critical attributes were changed
            if (mutation.attributeName === 'class' || mutation.attributeName === 'style') {
                console.warn('⚠️ Protected element modified:', element, mutation.attributeName);
                // Could implement auto-restore here
            }
        }
    }
    
    /**
     * Restore UI from snapshot
     */
    restoreUISnapshot() {
        const snapshot = this.uiSnapshots.get('current');
        if (!snapshot) {
            console.warn('⚠️ No snapshot to restore');
            return;
        }
        
        // Restore scroll position
        window.scrollTo(snapshot.scrollPosition.x, snapshot.scrollPosition.y);
        
        // Restore body classes
        document.body.className = snapshot.bodyClasses;
        
        // Restore critical elements
        this.restoreCriticalElements(snapshot.criticalElements);
        
        console.log('🔄 UI restored from snapshot');
    }
    
    restoreCriticalElements(criticalElements) {
        Object.entries(criticalElements).forEach(([selector, elementData]) => {
            const element = document.querySelector(selector);
            if (element) {
                // Restore attributes
                Object.entries(elementData.attributes).forEach(([name, value]) => {
                    element.setAttribute(name, value);
                });
                
                // Restore class
                element.className = elementData.className;
                
                // Restore content (be careful with this)
                if (elementData.innerHTML && element.innerHTML !== elementData.innerHTML) {
                    console.log(`🔄 Restoring content for ${selector}`);
                    element.innerHTML = elementData.innerHTML;
                }
            }
        });
    }
    
    /**
     * Unprotect elements
     */
    unprotectElements() {
        const protectedElements = document.querySelectorAll('[data-agent-protected]');
        protectedElements.forEach(element => {
            element.classList.remove('agent-protected');
            element.removeAttribute('data-agent-protected');
            element.removeAttribute('data-original-content');
        });
        
        this.originalStyles.clear();
    }
    
    /**
     * Add preservation indicator
     */
    addPreservationIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'ui-preservation-indicator';
        indicator.innerHTML = '🛡️ UI Protected';
        indicator.style.cssText = `
            position: fixed;
            top: 50px;
            right: 10px;
            background: #2ecc71;
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 9998;
            font-family: monospace;
        `;
        document.body.appendChild(indicator);
    }
    
    removePreservationIndicator() {
        const indicator = document.getElementById('ui-preservation-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    /**
     * Save current state
     */
    saveCurrentState() {
        if (this.isPreservationActive) {
            this.createUISnapshot();
        }
    }
    
    /**
     * Get preservation status
     */
    getStatus() {
        return {
            isActive: this.isPreservationActive,
            protectedElements: this.protectedElements.size,
            snapshots: this.uiSnapshots.size,
            originalStyles: this.originalStyles.size
        };
    }
    
    /**
     * Add custom protected element
     */
    addProtectedElement(selector) {
        this.protectedElements.add(selector);
        console.log(`🛡️ Added protected element: ${selector}`);
    }
    
    /**
     * Remove protected element
     */
    removeProtectedElement(selector) {
        this.protectedElements.delete(selector);
        console.log(`🛡️ Removed protected element: ${selector}`);
    }
    
    /**
     * Force restore UI
     */
    forceRestore() {
        console.log('🔄 Force restoring UI...');
        this.restoreUISnapshot();
    }
}

// Auto-initialize
window.agentUIPreserver = new AgentUIPreserver();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AgentUIPreserver;
}