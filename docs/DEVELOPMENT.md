# eTax Mobile PWA - Development Workflow

## 🎯 **DEVELOPMENT GUIDELINES**

### **Core Principles**
1. **Mobile-first design** - Tất cả UI phải responsive
2. **1:1 UI clone** - Clone chính xác theo screenshot gốc
3. **Cross-device sync** - Dữ liệu đồng bộ real-time
4. **PWA standards** - Tuân thủ PWA best practices
5. **Demo-focused** - Ưu tiên UI/UX hơn logic phức tạp

---

## 🔄 **DEVELOPMENT WORKFLOW**

### **1. Setup Development Environment**
```bash
# Clone repository
git clone [repository-url]
cd etax-mobile-pwa-main

# Install dependencies (if any)
npm install

# Start local server
python -m http.server 8000
# Or
npx serve .
```

### **2. Development Process**
```
1. Analyze requirements from screenshots
2. Implement UI/UX changes
3. Test on mobile devices
4. Deploy to Firebase
5. Test cross-device sync
6. Document changes
```

### **3. Testing Checklist**
- [ ] **Mobile responsiveness**
- [ ] **Cross-device sync**
- [ ] **Login/logout flow**
- [ ] **Admin panel functionality**
- [ ] **PWA features**
- [ ] **Performance**

---

## 📱 **UI/UX DEVELOPMENT RULES**

### **Design System**
```css
/* Color Palette */
:root {
    --red: #e74c3c;           /* Primary red */
    --blue: #3498db;          /* Primary blue */
    --green: #2ecc71;         /* Success green */
    --orange: #f39c12;        /* Warning orange */
    --gray: #95a5a6;          /* Neutral gray */
    --dark: #2c3e50;          /* Dark text */
    --light: #ecf0f1;         /* Light background */
}

/* Typography */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### **Mobile-First CSS**
```css
/* Mobile first approach */
.container {
    width: 100%;
    padding: 16px;
}

/* Tablet and up */
@media (min-width: 768px) {
    .container {
        max-width: 768px;
        margin: 0 auto;
    }
}

/* Desktop and up */
@media (min-width: 1024px) {
    .container {
        max-width: 1024px;
    }
}
```

### **Component Standards**
```html
<!-- Button Component -->
<button class="btn btn-primary" onclick="functionName()">
    <i class="fas fa-icon"></i>
    Button Text
</button>

<!-- Card Component -->
<div class="card">
    <div class="card-header">
        <h3>Title</h3>
    </div>
    <div class="card-body">
        Content
    </div>
</div>
```

---

## 🔧 **CODE STANDARDS**

### **JavaScript Standards**
```javascript
// Function naming: camelCase
function handleUserLogin() {
    // Implementation
}

// Variable naming: camelCase
const userData = {
    mst: '1234567890',
    fullName: 'User Name'
};

// Constants: UPPER_SNAKE_CASE
const API_ENDPOINTS = {
    LOGIN: '/api/login',
    LOGOUT: '/api/logout'
};

// Error handling
try {
    // Risky operation
} catch (error) {
    console.error('Error:', error);
    // Handle error gracefully
}
```

### **HTML Standards**
```html
<!-- Semantic HTML -->
<main>
    <section>
        <header>
            <h1>Page Title</h1>
        </header>
        <article>
            <!-- Content -->
        </article>
    </section>
</main>

<!-- Accessibility -->
<button aria-label="Close dialog" onclick="closeDialog()">
    <i class="fas fa-times" aria-hidden="true"></i>
</button>

<!-- PWA meta tags -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#e74c3c">
<meta name="apple-mobile-web-app-capable" content="yes">
```

---

## 🔄 **SYNC DEVELOPMENT RULES**

### **Firestore Integration**
```javascript
// Always check if Firestore is available
if (db) {
    // Firestore operations
} else {
    console.warn('Firestore not available, using localStorage only');
}

// Error handling for Firestore
db.collection('users').doc(mst).set(userData)
    .then(() => {
        console.log('✅ Data saved to Firestore');
    })
    .catch((error) => {
        console.error('❌ Firestore error:', error);
        // Fallback to localStorage
    });
```

### **BroadcastChannel Usage**
```javascript
// Initialize BroadcastChannel
let broadcastChannel;
if ('BroadcastChannel' in window) {
    broadcastChannel = new BroadcastChannel('etax_sync');
}

// Send data to other tabs
function syncDataToOtherTabs(type, data) {
    if (broadcastChannel) {
        broadcastChannel.postMessage({ type, data });
    }
}

// Listen for data from other tabs
broadcastChannel.onmessage = function(event) {
    const { type, data } = event.data;
    // Handle different message types
};
```

---

## 🚀 **DEPLOYMENT WORKFLOW**

### **Firebase Deployment**
```bash
# Quick deploy
./firebase-deploy.sh

# Manual deploy
npx firebase-tools@12.9.1 deploy --only hosting

# Check status
npx firebase-tools@12.9.1 status
```

### **Pre-deployment Checklist**
- [ ] **Test all functionality**
- [ ] **Check mobile responsiveness**
- [ ] **Verify cross-device sync**
- [ ] **Update documentation**
- [ ] **Commit changes to git**

### **Post-deployment Verification**
- [ ] **Check live URLs**
- [ ] **Test login flow**
- [ ] **Verify admin panel**
- [ ] **Test on mobile device**
- [ ] **Check console for errors**

---

## 🐛 **DEBUGGING GUIDELINES**

### **Common Issues & Solutions**

#### **1. Firestore Connection Issues**
```javascript
// Check Firebase initialization
console.log('Firebase app:', firebase.apps);
console.log('Firestore:', db);

// Verify config
const firebaseConfig = {
    apiKey: "your-api-key",
    projectId: "your-project-id",
    // ... other config
};
```

#### **2. Sync Issues**
```javascript
// Debug sync flow
console.log('📡 Sending sync data:', { type, data });
console.log('📥 Received sync data:', event.data);

// Check localStorage
console.log('localStorage keys:', Object.keys(localStorage));
```

#### **3. UI Issues**
```css
/* Debug CSS */
* {
    border: 1px solid red !important;
}

/* Check responsive breakpoints */
@media (max-width: 768px) {
    body::before {
        content: "Mobile view";
        position: fixed;
        top: 0;
        left: 0;
        background: red;
        color: white;
        z-index: 9999;
    }
}
```

---

## 📚 **DOCUMENTATION STANDARDS**

### **Code Comments**
```javascript
/**
 * Handles user login process
 * @param {string} mst - Mã số thuế
 * @param {string} password - Mật khẩu
 * @returns {Promise<boolean>} - Login success status
 */
async function handleLogin(mst, password) {
    // Implementation
}
```

### **Change Documentation**
```markdown
## Changes Made - [Date]

### Added
- New feature description

### Fixed
- Bug fix description

### Changed
- Modification description

### Removed
- Deprecated feature description
```

---

## 🎯 **AGENT INSTRUCTIONS**

### **For Future Agents**
1. **Always read this documentation first**
2. **Follow the established patterns**
3. **Test changes on mobile devices**
4. **Maintain cross-device sync**
5. **Update documentation after changes**
6. **Use the provided scripts for deployment**

### **Critical Files to Never Modify**
- `firebase.json` - Firebase hosting config
- `manifest.json` - PWA manifest
- `service-worker.js` - PWA service worker

### **Files That Require Careful Modification**
- `login.html` - Authentication logic
- `admin.html` - Admin panel logic
- `src/pages/index.html` - Main user interface

---

## 📊 **PERFORMANCE MONITORING**

### **Key Metrics to Track**
- **First Load Time**: <2 seconds
- **Sync Latency**: <500ms
- **Mobile Performance**: Smooth scrolling
- **Offline Functionality**: Basic features work

### **Monitoring Tools**
- Browser DevTools Performance tab
- Firebase Console Analytics
- Mobile device testing
- Cross-device sync verification

---

**Last Updated:** 2025-01-19  
**Development Version:** 1.0.0  
**Status:** ✅ Active Development
