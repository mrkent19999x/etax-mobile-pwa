# Agent Automation Integration Guide

Hướng dẫn tích hợp hệ thống Agent Automation vào eTax Mobile PWA hiện tại.

## 🎯 **TỔNG QUAN TÍCH HỢP**

Hệ thống Agent Automation được thiết kế để tích hợp seamlessly vào project hiện tại mà không làm ảnh hưởng đến functionality và UI/UX.

## 📁 **FILE STRUCTURE**

```
agent-automation/
├── agent-layout-manager.js      # Quản lý layout tự động
├── agent-workflow-manager.js    # Quản lý workflow agent
├── agent-ui-preserver.js        # Bảo vệ UI/UX layout
├── agent-automation.js          # Orchestrator chính
├── README.md                    # Documentation
└── integration-guide.md         # Hướng dẫn tích hợp
```

## 🔧 **BƯỚC 1: THÊM SCRIPTS VÀO HTML**

### **1.1. Thêm vào login.html**

```html
<!-- Thêm trước </head> -->
<script src="agent-automation/agent-layout-manager.js"></script>
<script src="agent-automation/agent-workflow-manager.js"></script>
<script src="agent-automation/agent-ui-preserver.js"></script>
<script src="agent-automation/agent-automation.js"></script>
```

### **1.2. Thêm vào admin.html**

```html
<!-- Thêm trước </head> -->
<script src="agent-automation/agent-layout-manager.js"></script>
<script src="agent-automation/agent-workflow-manager.js"></script>
<script src="agent-automation/agent-ui-preserver.js"></script>
<script src="agent-automation/agent-automation.js"></script>
```

### **1.3. Thêm vào src/pages/index.html**

```html
<!-- Thêm trước </head> -->
<script src="../../agent-automation/agent-layout-manager.js"></script>
<script src="../../agent-automation/agent-workflow-manager.js"></script>
<script src="../../agent-automation/agent-ui-preserver.js"></script>
<script src="../../agent-automation/agent-automation.js"></script>
```

## 🔧 **BƯỚC 2: TÍCH HỢP VÀO CODE HIỆN TẠI**

### **2.1. Modify login.html**

```javascript
// Thêm vào cuối file login.html, trước </body>
<script>
document.addEventListener('DOMContentLoaded', () => {
    // Check if agent automation is ready
    if (window.agentAutomation) {
        console.log('🤖 Agent Automation ready');
        
        // Setup agent mode for login page
        const loginConfig = {
            type: 'ui-development',
            target: 'mobile-first',
            preserveUI: true
        };
        
        // Auto-detect layout for login
        window.agentLayoutManager.detectCurrentLayout();
    }
});
</script>
```

### **2.2. Modify admin.html**

```javascript
// Thêm vào cuối file admin.html, trước </body>
<script>
document.addEventListener('DOMContentLoaded', () => {
    if (window.agentAutomation) {
        console.log('🤖 Agent Automation ready for admin');
        
        // Setup agent mode for admin panel
        const adminConfig = {
            type: 'ui-development',
            target: 'admin-panel',
            preserveUI: true
        };
        
        // Auto-detect layout for admin
        window.agentLayoutManager.detectCurrentLayout();
    }
});
</script>
```

### **2.3. Modify src/pages/index.html**

```javascript
// Thêm vào cuối file src/pages/index.html, trước </body>
<script>
document.addEventListener('DOMContentLoaded', () => {
    if (window.agentAutomation) {
        console.log('🤖 Agent Automation ready for user interface');
        
        // Setup agent mode for user interface
        const userConfig = {
            type: 'ui-development',
            target: 'user-interface',
            preserveUI: true
        };
        
        // Auto-detect layout for user interface
        window.agentLayoutManager.detectCurrentLayout();
    }
});
</script>
```

## 🔧 **BƯỚC 3: TÍCH HỢP VỚI FIREBASE SYNC**

### **3.1. Modify existing sync functions**

```javascript
// Trong các file service hiện tại, thêm agent integration
function syncDataToOtherTabs(type, data) {
    // Existing sync code...
    
    // Add agent automation integration
    if (window.agentWorkflowManager) {
        window.agentWorkflowManager.startWorkflow('cross-device-sync', data);
    }
}
```

### **3.2. Modify Firestore operations**

```javascript
// Trong các file service hiện tại
function saveUserData(userData) {
    // Existing save code...
    
    // Add agent automation integration
    if (window.agentAutomation) {
        window.agentAutomation.executeQuickTask(async () => {
            // Additional agent tasks if needed
            console.log('Agent task: User data saved');
        });
    }
}
```

## 🔧 **BƯỚC 4: THÊM AGENT TRIGGERS**

### **4.1. Thêm vào admin panel**

```javascript
// Thêm vào admin.html
function enableAgentMode() {
    if (window.agentAutomation) {
        const taskConfig = {
            type: 'ui-development',
            target: 'admin-panel',
            preserveUI: true
        };
        
        window.agentAutomation.startAutomation(taskConfig);
    }
}

function disableAgentMode() {
    if (window.agentAutomation) {
        window.agentAutomation.stopAutomation();
    }
}

// Thêm buttons vào admin panel
function addAgentControls() {
    const controls = `
        <div class="agent-controls" style="position: fixed; top: 10px; left: 10px; z-index: 9999;">
            <button onclick="enableAgentMode()" class="btn btn-primary">🤖 Enable Agent</button>
            <button onclick="disableAgentMode()" class="btn btn-secondary">🛑 Disable Agent</button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', controls);
}

// Call when admin panel loads
document.addEventListener('DOMContentLoaded', addAgentControls);
```

### **4.2. Thêm vào user interface**

```javascript
// Thêm vào src/pages/index.html
function toggleAgentMode() {
    if (window.agentAutomation) {
        const status = window.agentAutomation.getStatus();
        
        if (status.isRunning) {
            window.agentAutomation.stopAutomation();
        } else {
            const taskConfig = {
                type: 'ui-development',
                target: 'user-interface',
                preserveUI: true
            };
            window.agentAutomation.startAutomation(taskConfig);
        }
    }
}

// Thêm button vào user interface
function addAgentToggle() {
    const toggle = `
        <button onclick="toggleAgentMode()" class="agent-toggle" 
                style="position: fixed; bottom: 20px; right: 20px; z-index: 9999; 
                       background: #e74c3c; color: white; border: none; 
                       padding: 10px; border-radius: 50%; font-size: 20px;">
            🤖
        </button>
    `;
    document.body.insertAdjacentHTML('beforeend', toggle);
}

document.addEventListener('DOMContentLoaded', addAgentToggle);
```

## 🔧 **BƯỚC 5: CUSTOMIZE WORKFLOWS**

### **5.1. Thêm custom workflow cho eTax**

```javascript
// Thêm vào cuối file agent-automation.js hoặc tạo file riêng
function setupETaxWorkflows() {
    if (window.agentWorkflowManager) {
        // eTax Login Workflow
        window.agentWorkflowManager.addWorkflow('etax-login', {
            name: 'eTax Login Workflow',
            description: 'Specialized workflow for eTax login process',
            steps: [
                {
                    name: 'detect_login_page',
                    action: () => {
                        console.log('🔍 Detecting login page...');
                        return document.querySelector('#loginForm') !== null;
                    },
                    timeout: 1000
                },
                {
                    name: 'preserve_login_ui',
                    action: () => {
                        console.log('🛡️ Preserving login UI...');
                        return window.agentUIPreserver.startPreservation();
                    },
                    timeout: 2000
                },
                {
                    name: 'validate_login_form',
                    action: () => {
                        console.log('✅ Validating login form...');
                        const form = document.querySelector('#loginForm');
                        return form && form.checkValidity();
                    },
                    timeout: 1000
                },
                {
                    name: 'restore_login_ui',
                    action: () => {
                        console.log('🔄 Restoring login UI...');
                        return window.agentUIPreserver.endPreservation();
                    },
                    timeout: 2000
                }
            ]
        });
        
        // eTax Admin Workflow
        window.agentWorkflowManager.addWorkflow('etax-admin', {
            name: 'eTax Admin Workflow',
            description: 'Specialized workflow for eTax admin panel',
            steps: [
                {
                    name: 'detect_admin_panel',
                    action: () => {
                        console.log('🔍 Detecting admin panel...');
                        return document.querySelector('.admin-panel') !== null;
                    },
                    timeout: 1000
                },
                {
                    name: 'preserve_admin_ui',
                    action: () => {
                        console.log('🛡️ Preserving admin UI...');
                        return window.agentUIPreserver.startPreservation();
                    },
                    timeout: 2000
                },
                {
                    name: 'validate_admin_functions',
                    action: () => {
                        console.log('✅ Validating admin functions...');
                        const functions = ['createMST', 'uploadPDF', 'manageUsers'];
                        return functions.every(func => typeof window[func] === 'function');
                    },
                    timeout: 2000
                },
                {
                    name: 'restore_admin_ui',
                    action: () => {
                        console.log('🔄 Restoring admin UI...');
                        return window.agentUIPreserver.endPreservation();
                    },
                    timeout: 2000
                }
            ]
        });
    }
}

// Call setup function
document.addEventListener('DOMContentLoaded', setupETaxWorkflows);
```

## 🔧 **BƯỚC 6: TESTING & VERIFICATION**

### **6.1. Test Script**

```javascript
// Tạo file test-agent.js
function testAgentAutomation() {
    console.log('🧪 Testing Agent Automation...');
    
    // Test 1: Check if modules are loaded
    const modules = {
        layoutManager: !!window.agentLayoutManager,
        workflowManager: !!window.agentWorkflowManager,
        uiPreserver: !!window.agentUIPreserver,
        automation: !!window.agentAutomation
    };
    
    console.log('📋 Module Status:', modules);
    
    // Test 2: Test layout detection
    if (window.agentLayoutManager) {
        const layout = window.agentLayoutManager.detectCurrentLayout();
        console.log('📱 Layout Detection:', layout);
    }
    
    // Test 3: Test workflow execution
    if (window.agentWorkflowManager) {
        window.agentWorkflowManager.startWorkflow('ui-layout-preservation')
            .then(success => {
                console.log('🔄 Workflow Test:', success ? 'PASSED' : 'FAILED');
            });
    }
    
    // Test 4: Test UI preservation
    if (window.agentUIPreserver) {
        window.agentUIPreserver.startPreservation();
        setTimeout(() => {
            window.agentUIPreserver.endPreservation();
            console.log('🛡️ UI Preservation Test: PASSED');
        }, 2000);
    }
    
    console.log('✅ Agent Automation Test Completed');
}

// Run test
testAgentAutomation();
```

### **6.2. Integration Test**

```javascript
// Thêm vào cuối mỗi page để test
function runIntegrationTest() {
    console.log('🔧 Running Integration Test...');
    
    // Test agent automation
    if (window.agentAutomation) {
        const status = window.agentAutomation.getStatus();
        console.log('🤖 Agent Status:', status);
        
        if (status.isInitialized) {
            console.log('✅ Agent Automation: READY');
        } else {
            console.log('❌ Agent Automation: NOT READY');
        }
    }
    
    // Test layout manager
    if (window.agentLayoutManager) {
        const layout = window.agentLayoutManager.getLayoutInfo();
        console.log('📱 Layout Info:', layout);
    }
    
    // Test workflow manager
    if (window.agentWorkflowManager) {
        const workflows = window.agentWorkflowManager.getStatus();
        console.log('🔄 Workflows:', workflows);
    }
    
    // Test UI preserver
    if (window.agentUIPreserver) {
        const uiStatus = window.agentUIPreserver.getStatus();
        console.log('🛡️ UI Preserver:', uiStatus);
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', runIntegrationTest);
```

## 🚀 **BƯỚC 7: DEPLOYMENT**

### **7.1. Update firebase.json**

```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "agent-automation/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=3600"
          }
        ]
      }
    ]
  }
}
```

### **7.2. Deploy với agent automation**

```bash
# Deploy to Firebase
./firebase-deploy.sh

# Verify deployment
curl -I https://anhbao-373f3.web.app/agent-automation/agent-automation.js
```

## 🎯 **BENEFITS SAU KHI TÍCH HỢP**

1. **UI Protection** - Agent không làm hỏng UI/UX
2. **Layout Preservation** - Giữ nguyên responsive design
3. **Automated Workflows** - Chạy theo quy trình chuẩn
4. **Error Recovery** - Tự động khôi phục khi lỗi
5. **Cross-Device Sync** - Duy trì sync giữa các thiết bị
6. **Mobile-First** - Ưu tiên mobile experience
7. **PWA Maintenance** - Bảo trì PWA features

## 🚨 **LƯU Ý QUAN TRỌNG**

1. **Không modify** các file core của project
2. **Test kỹ** trước khi deploy
3. **Backup** project trước khi tích hợp
4. **Monitor** performance sau khi tích hợp
5. **Update documentation** sau khi thay đổi

## 🔄 **MAINTENANCE**

### **Regular Checks**
- Monitor agent automation status
- Check UI preservation effectiveness
- Verify workflow execution
- Test cross-device sync

### **Updates**
- Update workflows khi cần
- Add new protected elements
- Optimize performance
- Fix bugs và issues

---

**Last Updated:** 2025-01-19  
**Integration Version:** 1.0.0  
**Status:** ✅ Ready for Integration