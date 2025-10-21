# eTax Mobile PWA - Agent Instructions

## 🤖 **AGENT WORKFLOW INSTRUCTIONS**

### **CRITICAL: Read This First**
**Mọi agent mới phải đọc file này trước khi làm việc!**

---

## 🎯 **PROJECT CONTEXT**

### **What This Project Is**
- **eTax Mobile PWA** - Progressive Web App demo
- **UI/UX Clone** - Clone 1:1 từ app gốc theo screenshot
- **Cross-device Sync** - Dữ liệu đồng bộ real-time
- **Mobile-first** - Ưu tiên mobile experience
- **Demo Project** - Focus vào UI/UX, không phải business logic

### **Current Status**
- ✅ **Production Ready** - Deployed và hoạt động
- ✅ **Firebase Hosting** - `https://anhbao-373f3.web.app`
- ✅ **Cross-device Sync** - Firestore + BroadcastChannel
- ✅ **All Features Working** - Login, Admin, Tra cứu, etc.

---

## 🚨 **CRITICAL RULES**

### **NEVER DO THESE**
1. ❌ **Don't modify `firebase.json`** - Firebase hosting config
2. ❌ **Don't modify `manifest.json`** - PWA manifest
3. ❌ **Don't modify `service-worker.js`** - PWA service worker
4. ❌ **Don't break cross-device sync** - Firestore integration
5. ❌ **Don't change authentication flow** - Login/logout system
6. ❌ **Don't modify core URLs** - Live URLs đang hoạt động

### **ALWAYS DO THESE**
1. ✅ **Test on mobile devices** - Mobile-first design
2. ✅ **Maintain cross-device sync** - Firestore + localStorage
3. ✅ **Follow UI/UX patterns** - Clone 1:1 từ screenshot
4. ✅ **Update documentation** - Document mọi thay đổi
5. ✅ **Use provided scripts** - Deploy scripts đã có sẵn
6. ✅ **Test before deploy** - Verify functionality

---

## 🔄 **STANDARD WORKFLOW**

### **1. Before Starting Work**
```bash
# Read current status
cat README.md
cat docs/ARCHITECTURE.md
cat docs/DEVELOPMENT.md

# Check live URLs
curl -I https://anhbao-373f3.web.app
```

### **2. Development Process**
```
1. Understand requirement from screenshots
2. Implement changes following established patterns
3. Test locally with mobile viewport
4. Test cross-device sync
5. Deploy using provided scripts
6. Verify on live URLs
7. Update documentation
```

### **3. Testing Checklist**
- [ ] **Mobile responsiveness** (iPhone/Android viewport)
- [ ] **Cross-device sync** (Desktop ↔ Mobile)
- [ ] **Login flow** (MST: 9999999999 / firestore123)
- [ ] **Admin panel** (admin / Baoan2022)
- [ ] **Navigation** (Back arrows, logout)
- [ ] **PWA features** (Install, offline)

---

## 📱 **UI/UX DEVELOPMENT RULES**

### **Design Standards**
```css
/* Always use these colors */
:root {
    --red: #e74c3c;      /* Primary red for buttons */
    --blue: #3498db;     /* Primary blue for links */
    --green: #2ecc71;    /* Success messages */
    --gray: #95a5a6;     /* Neutral elements */
}

/* Mobile-first approach */
.container {
    width: 100%;
    padding: 16px;
}

@media (min-width: 768px) {
    .container {
        max-width: 768px;
        margin: 0 auto;
    }
}
```

### **Component Patterns**
```html
<!-- Button Pattern -->
<button class="btn btn-primary" onclick="functionName()">
    <i class="fas fa-icon"></i>
    Button Text
</button>

<!-- Card Pattern -->
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

## 🔧 **CODE PATTERNS**

### **JavaScript Standards**
```javascript
// Function naming: camelCase
function handleUserAction() {
    // Implementation
}

// Error handling: Always use try-catch
try {
    // Risky operation
} catch (error) {
    console.error('Error:', error);
    // Handle gracefully
}

// Firestore operations: Always check availability
if (db) {
    db.collection('users').doc(mst).set(userData)
        .then(() => console.log('✅ Saved'))
        .catch(error => console.error('❌ Error:', error));
}
```

### **Sync Patterns**
```javascript
// Always implement dual storage
function saveUserData(userData) {
    // 1. Save to localStorage (fast access)
    localStorage.setItem(`etax_user_data_${mst}`, JSON.stringify(userData));
    
    // 2. Save to Firestore (cross-device sync)
    if (db) {
        db.collection('users').doc(mst).set(userData);
    }
    
    // 3. Broadcast to other tabs
    syncDataToOtherTabs('user_updated', { mst, userData });
}
```

---

## 🚀 **DEPLOYMENT PROCESS**

### **Standard Deployment**
```bash
# Use provided script
./firebase-deploy.sh

# Manual deployment
npx firebase-tools@12.9.1 deploy --only hosting
```

### **Pre-deployment Checklist**
- [ ] **Test all functionality locally**
- [ ] **Check mobile viewport**
- [ ] **Verify cross-device sync**
- [ ] **Test login/logout flow**
- [ ] **Check admin panel**
- [ ] **Update documentation**

### **Post-deployment Verification**
- [ ] **Check live URLs work**
- [ ] **Test on actual mobile device**
- [ ] **Verify sync between devices**
- [ ] **Check console for errors**
- [ ] **Test PWA installation**

---

## 🐛 **TROUBLESHOOTING GUIDE**

### **Common Issues**

#### **1. Login Not Working**
```javascript
// Check Firestore connection
console.log('Firestore:', db);
console.log('localStorage:', Object.keys(localStorage));

// Verify user data exists
const userData = localStorage.getItem('etax_user_data_9999999999');
console.log('User data:', userData);
```

#### **2. Sync Issues**
```javascript
// Debug sync flow
console.log('📡 Sending:', { type, data });
console.log('📥 Received:', event.data);

// Check BroadcastChannel
console.log('BroadcastChannel:', broadcastChannel);
```

#### **3. UI Issues**
```css
/* Debug responsive design */
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

## 📚 **DOCUMENTATION REQUIREMENTS**

### **Required Documentation**
1. **README.md** - Project overview và quick start
2. **docs/ARCHITECTURE.md** - System architecture
3. **docs/DEVELOPMENT.md** - Development guidelines
4. **docs/TROUBLESHOOTING.md** - Common issues
5. **docs/CHANGELOG.md** - Change history

### **Documentation Standards**
```markdown
## Changes Made - [Date]

### Added
- New feature description
- Files created

### Fixed
- Bug fix description
- Issues resolved

### Changed
- Modification description
- Files modified

### Removed
- Deprecated feature description
- Files deleted
```

---

## 🎯 **AGENT-SPECIFIC INSTRUCTIONS**

### **For UI/UX Agents**
- Focus on **mobile-first design**
- Clone **1:1 từ screenshots**
- Maintain **responsive breakpoints**
- Test on **actual mobile devices**

### **For Backend Agents**
- Maintain **Firestore integration**
- Preserve **cross-device sync**
- Keep **authentication flow**
- Test **data consistency**

### **For DevOps Agents**
- Use **provided deployment scripts**
- Maintain **Firebase hosting config**
- Preserve **PWA manifest**
- Keep **service worker**

---

## 📊 **SUCCESS METRICS**

### **Technical Metrics**
- **First Load Time**: <2 seconds
- **Sync Latency**: <500ms
- **Mobile Performance**: Smooth scrolling
- **Cross-device Sync**: Real-time

### **User Experience Metrics**
- **Mobile Responsiveness**: Perfect on all devices
- **UI/UX Accuracy**: 1:1 clone from screenshots
- **Navigation Flow**: Intuitive and smooth
- **PWA Features**: Native app experience

---

## 🚨 **EMERGENCY PROCEDURES**

### **If Something Breaks**
1. **Don't panic** - Check live URLs first
2. **Revert changes** - Use git to rollback
3. **Check logs** - Browser console errors
4. **Test locally** - Verify fix works
5. **Deploy fix** - Use standard deployment
6. **Verify live** - Test on live URLs
7. **Document issue** - Update troubleshooting guide

### **Rollback Procedure**
```bash
# Check git status
git status

# Revert to last working commit
git reset --hard HEAD~1

# Deploy rollback
./firebase-deploy.sh

# Verify rollback
curl -I https://anhbao-373f3.web.app
```

---

## 📞 **SUPPORT INFORMATION**

### **Live URLs**
- **Main App**: `https://anhbao-373f3.web.app`
- **Login**: `https://anhbao-373f3.web.app/login.html`
- **Admin**: `https://anhbao-373f3.web.app/admin.html`

### **Test Credentials**
- **User Login**: MST: `9999999999` / Pass: `firestore123`
- **Admin Login**: User: `admin` / Pass: `Baoan2022`

### **Firebase Console**
- **URL**: `https://console.firebase.google.com/project/anhbao-373f3/overview`
- **Project**: `anhbao-373f3`

---

**⚠️ CRITICAL REMINDER: Always read this file before starting any work!**

**Last Updated:** 2025-01-19  
**Agent Instructions Version:** 1.0.0  
**Status:** ✅ Active
