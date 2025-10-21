# eTax Mobile PWA - Troubleshooting Guide

## 🐛 **COMMON ISSUES & SOLUTIONS**

### **Authentication Issues**

#### **Problem: Login không hoạt động**
**Symptoms:**
- User nhập MST + Password nhưng không login được
- Hiển thị "MST không tồn tại"
- Redirect về login page

**Solutions:**
```javascript
// 1. Check Firestore connection
console.log('Firestore available:', !!db);
console.log('Firebase config:', firebaseConfig);

// 2. Check user data in localStorage
const userData = localStorage.getItem('etax_user_data_9999999999');
console.log('User data:', userData);

// 3. Check Firestore data
if (db) {
    db.collection('users').doc('9999999999').get()
        .then(doc => console.log('Firestore data:', doc.data()));
}

// 4. Verify credentials
const testMst = '9999999999';
const testPassword = 'firestore123';
```

#### **Problem: Admin login không hoạt động**
**Symptoms:**
- Admin nhập credentials nhưng không vào được
- Hiển thị "Sai tên đăng nhập hoặc mật khẩu"

**Solutions:**
```javascript
// Check admin credentials
const adminUser = 'admin';
const adminPass = 'Baoan2022';

// Verify in admin-login.html
console.log('Admin credentials:', { adminUser, adminPass });
```

---

### **Sync Issues**

#### **Problem: Dữ liệu không sync giữa devices**
**Symptoms:**
- Tạo MST trên Desktop nhưng Mobile không thấy
- Dữ liệu khác nhau giữa các thiết bị
- Sync không real-time

**Solutions:**
```javascript
// 1. Check Firestore connection
if (!db) {
    console.error('❌ Firestore not initialized');
    return;
}

// 2. Check BroadcastChannel
if (!broadcastChannel) {
    console.error('❌ BroadcastChannel not initialized');
    return;
}

// 3. Debug sync flow
function debugSync(type, data) {
    console.log('📡 Sending sync:', { type, data });
    
    // Send to Firestore
    if (db) {
        db.collection('users').doc(data.mst).set(data.userData)
            .then(() => console.log('✅ Firestore updated'))
            .catch(error => console.error('❌ Firestore error:', error));
    }
    
    // Send to other tabs
    if (broadcastChannel) {
        broadcastChannel.postMessage({ type, data });
        console.log('📡 Broadcast sent');
    }
}

// 4. Check localStorage
console.log('localStorage keys:', Object.keys(localStorage));
```

#### **Problem: BroadcastChannel không hoạt động**
**Symptoms:**
- Sync giữa các tab không hoạt động
- Dữ liệu không update real-time

**Solutions:**
```javascript
// 1. Check Browser support
if (!('BroadcastChannel' in window)) {
    console.error('❌ BroadcastChannel not supported');
    return;
}

// 2. Reinitialize BroadcastChannel
function reinitBroadcastChannel() {
    if (broadcastChannel) {
        broadcastChannel.close();
    }
    
    broadcastChannel = new BroadcastChannel('etax_sync');
    
    broadcastChannel.onmessage = function(event) {
        console.log('📥 Received:', event.data);
        // Handle message
    };
}

// 3. Test BroadcastChannel
function testBroadcastChannel() {
    broadcastChannel.postMessage({ test: 'ping' });
    console.log('📡 Test message sent');
}
```

---

### **UI/UX Issues**

#### **Problem: Layout bị vỡ trên mobile**
**Symptoms:**
- Elements bị overflow
- Text bị cắt
- Buttons không click được

**Solutions:**
```css
/* Debug CSS */
* {
    border: 1px solid red !important;
}

/* Check viewport */
@media (max-width: 768px) {
    body::before {
        content: "Mobile view - 768px";
        position: fixed;
        top: 0;
        left: 0;
        background: red;
        color: white;
        z-index: 9999;
        padding: 5px;
    }
}

/* Fix common mobile issues */
.container {
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
}

button {
    min-height: 44px; /* iOS touch target */
    min-width: 44px;
}
```

#### **Problem: Font Awesome icons không hiển thị**
**Symptoms:**
- Icons hiển thị dạng text
- Missing icons

**Solutions:**
```html
<!-- Check CDN link -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

<!-- Verify icon usage -->
<i class="fas fa-user"></i> <!-- Font Awesome Solid -->
<i class="far fa-user"></i> <!-- Font Awesome Regular -->
<i class="fab fa-github"></i> <!-- Font Awesome Brands -->
```

---

### **Performance Issues**

#### **Problem: App load chậm**
**Symptoms:**
- First load >3 seconds
- Slow navigation
- Laggy animations

**Solutions:**
```javascript
// 1. Check bundle size
console.log('Page load time:', performance.now());

// 2. Optimize images
// Use WebP format
// Compress images
// Lazy load images

// 3. Check Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
        .then(registration => console.log('SW ready:', registration));
}

// 4. Monitor performance
performance.mark('start');
// ... operations ...
performance.mark('end');
performance.measure('operation', 'start', 'end');
```

#### **Problem: Memory leaks**
**Symptoms:**
- App chậm dần theo thời gian
- Browser crash
- High memory usage

**Solutions:**
```javascript
// 1. Clean up event listeners
function cleanup() {
    if (broadcastChannel) {
        broadcastChannel.close();
        broadcastChannel = null;
    }
    
    // Remove event listeners
    document.removeEventListener('click', handleClick);
}

// 2. Clear intervals/timeouts
const intervalId = setInterval(() => {}, 1000);
clearInterval(intervalId);

// 3. Clean up DOM references
let element = document.getElementById('element');
element = null; // Remove reference
```

---

### **Deployment Issues**

#### **Problem: Firebase deploy thất bại**
**Symptoms:**
- Deploy command fails
- Files không upload
- 404 errors

**Solutions:**
```bash
# 1. Check Firebase CLI version
npx firebase-tools@12.9.1 --version

# 2. Check Firebase config
cat firebase.json

# 3. Check project status
npx firebase-tools@12.9.1 status

# 4. Manual deploy
npx firebase-tools@12.9.1 deploy --only hosting --debug

# 5. Check Firebase console
# https://console.firebase.google.com/project/anhbao-373f3/overview
```

#### **Problem: CORS errors**
**Symptoms:**
- Cross-origin requests blocked
- API calls fail
- Firebase errors

**Solutions:**
```javascript
// 1. Check Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyD_rJgBFgBulheVenQUE2KXr4PBpSpTCxw",
    authDomain: "etax-7fbf8.firebaseapp.com",
    projectId: "etax-7fbf8",
    // ... other config
};

// 2. Verify domain in Firebase console
// Authentication > Settings > Authorized domains

// 3. Use relative URLs
// Instead of: https://anhbao-373f3.web.app/api
// Use: /api
```

---

### **PWA Issues**

#### **Problem: PWA không install được**
**Symptoms:**
- Install button không hiển thị
- "Add to Home Screen" không hoạt động
- PWA features không work

**Solutions:**
```json
// Check manifest.json
{
    "name": "eTax Mobile",
    "short_name": "eTax",
    "start_url": "/",
    "display": "standalone",
    "theme_color": "#e74c3c",
    "background_color": "#ffffff",
    "icons": [
        {
            "src": "/assets/icon-192.png",
            "sizes": "192x192",
            "type": "image/png"
        }
    ]
}
```

```javascript
// Check Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => console.log('SW registered:', registration))
        .catch(error => console.error('SW registration failed:', error));
}
```

---

## 🔧 **DEBUGGING TOOLS**

### **Browser DevTools**
```javascript
// Console debugging
console.log('Debug info:', data);
console.error('Error:', error);
console.warn('Warning:', warning);

// Performance monitoring
console.time('operation');
// ... code ...
console.timeEnd('operation');

// Memory usage
console.log('Memory:', performance.memory);
```

### **Mobile Debugging**
```javascript
// Check mobile viewport
console.log('Viewport:', {
    width: window.innerWidth,
    height: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio
});

// Check touch events
document.addEventListener('touchstart', (e) => {
    console.log('Touch start:', e.touches[0]);
});
```

### **Network Debugging**
```javascript
// Check network requests
fetch('/api/data')
    .then(response => {
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        return response.json();
    })
    .then(data => console.log('Response data:', data))
    .catch(error => console.error('Network error:', error));
```

---

## 📞 **SUPPORT CONTACTS**

### **Live URLs for Testing**
- **Main App**: `https://anhbao-373f3.web.app`
- **Login**: `https://anhbao-373f3.web.app/login.html`
- **Admin**: `https://anhbao-373f3.web.app/admin.html`

### **Test Credentials**
- **User**: MST: `9999999999` / Pass: `firestore123`
- **Admin**: User: `admin` / Pass: `Baoan2022`

### **Firebase Console**
- **URL**: `https://console.firebase.google.com/project/anhbao-373f3/overview`
- **Project**: `anhbao-373f3`

---

**Last Updated:** 2025-01-19  
**Troubleshooting Version:** 1.0.0  
**Status:** ✅ Active
