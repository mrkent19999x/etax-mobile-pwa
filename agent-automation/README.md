# Agent Automation System

Hệ thống tự động hóa agent cho eTax Mobile PWA, đảm bảo agent có thể chạy tự động mà vẫn giữ được UX/UI layout.

## 🎯 **TỔNG QUAN**

Hệ thống Agent Automation bao gồm 4 module chính:

1. **AgentLayoutManager** - Quản lý layout tự động
2. **AgentWorkflowManager** - Quản lý workflow agent
3. **AgentUIPreserver** - Bảo vệ UI/UX layout
4. **AgentAutomation** - Orchestrator chính

## 🚀 **CÁCH SỬ DỤNG**

### **1. Khởi tạo hệ thống**

```javascript
// Hệ thống tự động khởi tạo khi load page
// Các module sẽ có sẵn:
// - window.agentLayoutManager
// - window.agentWorkflowManager  
// - window.agentUIPreserver
// - window.agentAutomation
```

### **2. Chạy agent automation**

```javascript
// Chạy automation với task config
const taskConfig = {
    type: 'ui-development',
    target: 'mobile-first',
    preserveUI: true
};

await window.agentAutomation.startAutomation(taskConfig);
```

### **3. Chạy quick task**

```javascript
// Chạy task nhanh không cần full automation
const result = await window.agentAutomation.executeQuickTask(async () => {
    // Your task code here
    console.log('Doing something...');
    return 'Task completed';
});
```

### **4. Sử dụng workflow riêng lẻ**

```javascript
// Chạy workflow cụ thể
await window.agentWorkflowManager.startWorkflow('ui-layout-preservation');

// Chạy mobile-first workflow
await window.agentWorkflowManager.startWorkflow('mobile-first-development');
```

## 📋 **WORKFLOWS CÓ SẴN**

### **1. UI Layout Preservation**
- Detect current layout
- Backup UI state
- Enable agent mode
- Execute agent task
- Validate layout integrity
- Restore UI state
- Disable agent mode

### **2. Mobile-First Development**
- Set mobile viewport
- Apply mobile theme
- Test responsive breakpoints
- Validate mobile UI

### **3. Cross-Device Sync**
- Check Firestore connection
- Backup localStorage
- Sync to Firestore
- Broadcast to other tabs
- Verify sync success

### **4. PWA Maintenance**
- Check service worker
- Validate manifest
- Test offline functionality
- Update cache

## 🛡️ **UI PROTECTION FEATURES**

### **Protected Elements**
- `body`, `main`, `.container`
- `.header`, `.footer`, `.navigation`
- `.sidebar`, `.content`
- `.btn`, `.card`, `.form`
- `.modal`, `.alert`, `.toast`

### **Protection Methods**
- DOM mutation observer
- Element content backup
- Style preservation
- Attribute protection
- Auto-restore on changes

## 📱 **LAYOUT MANAGEMENT**

### **Layout Presets**
- **mobile-first**: 375x667, mobile theme
- **admin-panel**: 1200x800, admin theme  
- **user-interface**: 375x667, user theme
- **desktop**: 1920x1080, desktop theme

### **Auto Detection**
- Page type detection
- Viewport size detection
- Responsive breakpoint handling
- Theme auto-application

## 🔧 **API REFERENCE**

### **AgentAutomation**

```javascript
// Start automation
await agentAutomation.startAutomation(taskConfig);

// Stop automation
await agentAutomation.stopAutomation();

// Execute quick task
await agentAutomation.executeQuickTask(taskFunction, options);

// Get status
const status = agentAutomation.getStatus();

// Get detailed status
const detailedStatus = agentAutomation.getDetailedStatus();
```

### **AgentLayoutManager**

```javascript
// Detect current layout
const layout = agentLayoutManager.detectCurrentLayout();

// Apply layout preset
agentLayoutManager.applyLayout(preset);

// Enable/disable agent mode
agentLayoutManager.enableAgentMode();
agentLayoutManager.disableAgentMode();

// Get layout info
const info = agentLayoutManager.getLayoutInfo();
```

### **AgentWorkflowManager**

```javascript
// Start workflow
await workflowManager.startWorkflow('workflow-name', taskData);

// Stop workflow
workflowManager.stopWorkflow();

// Get status
const status = workflowManager.getStatus();

// Get history
const history = workflowManager.getHistory();
```

### **AgentUIPreserver**

```javascript
// Start preservation
uiPreserver.startPreservation();

// End preservation
uiPreserver.endPreservation();

// Add protected element
uiPreserver.addProtectedElement('.my-element');

// Force restore
uiPreserver.forceRestore();

// Get status
const status = uiPreserver.getStatus();
```

## 🎯 **TASK CONFIG EXAMPLES**

### **UI Development Task**
```javascript
const taskConfig = {
    type: 'ui-development',
    target: 'mobile-first',
    preserveUI: true,
    workflow: 'ui-layout-preservation'
};
```

### **Mobile Development Task**
```javascript
const taskConfig = {
    type: 'mobile-development',
    target: 'responsive',
    preserveUI: true,
    workflow: 'mobile-first-development'
};
```

### **Sync Operation Task**
```javascript
const taskConfig = {
    type: 'sync-operation',
    target: 'cross-device',
    preserveUI: true,
    workflow: 'cross-device-sync',
    data: { /* sync data */ }
};
```

## 🚨 **ERROR HANDLING**

Hệ thống có error handling tự động:

1. **Module Load Errors** - Retry và fallback
2. **Workflow Failures** - Auto rollback
3. **UI Protection Errors** - Force restore
4. **Layout Errors** - Reset to default

## 📊 **MONITORING & DEBUGGING**

### **Status Monitoring**
```javascript
// Get overall status
const status = agentAutomation.getDetailedStatus();
console.log('Agent Status:', status);

// Monitor specific module
const layoutStatus = agentLayoutManager.getLayoutInfo();
const workflowStatus = workflowManager.getStatus();
const uiStatus = uiPreserver.getStatus();
```

### **Event Listening**
```javascript
// Listen for automation events
window.addEventListener('agent-automation-completed', (e) => {
    console.log('Automation completed:', e.detail);
});

window.addEventListener('agent-automation-failed', (e) => {
    console.log('Automation failed:', e.detail);
});

window.addEventListener('agent-automation-error', (e) => {
    console.log('Automation error:', e.detail);
});
```

## 🔄 **INTEGRATION VỚI PROJECT HIỆN TẠI**

### **1. Thêm vào HTML**
```html
<!-- Thêm vào head của các page chính -->
<script src="agent-automation/agent-layout-manager.js"></script>
<script src="agent-automation/agent-workflow-manager.js"></script>
<script src="agent-automation/agent-ui-preserver.js"></script>
<script src="agent-automation/agent-automation.js"></script>
```

### **2. Sử dụng trong code hiện tại**
```javascript
// Trong login.html, admin.html, index.html
document.addEventListener('DOMContentLoaded', () => {
    // Agent automation sẽ tự động khởi tạo
    console.log('Agent system ready:', window.agentAutomation.getStatus());
});
```

### **3. Custom workflows**
```javascript
// Thêm workflow custom
window.agentWorkflowManager.addWorkflow('custom-workflow', {
    name: 'Custom Workflow',
    description: 'My custom workflow',
    steps: [
        {
            name: 'step1',
            action: () => console.log('Step 1'),
            timeout: 1000
        }
        // ... more steps
    ]
});
```

## 🎯 **BENEFITS**

1. **UI Protection** - Đảm bảo UI không bị hỏng khi agent chạy
2. **Layout Preservation** - Giữ nguyên layout responsive
3. **Automated Workflows** - Chạy theo quy trình chuẩn
4. **Error Recovery** - Tự động khôi phục khi lỗi
5. **Cross-Device Sync** - Duy trì sync giữa các thiết bị
6. **Mobile-First** - Ưu tiên mobile experience
7. **PWA Maintenance** - Bảo trì PWA features

## 🚀 **NEXT STEPS**

1. **Test integration** với project hiện tại
2. **Customize workflows** cho specific tasks
3. **Add monitoring** và logging
4. **Optimize performance** cho production
5. **Add more protection** cho critical elements

---

**Last Updated:** 2025-01-19  
**Version:** 1.0.0  
**Status:** ✅ Ready for Integration