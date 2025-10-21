# eTax Mobile PWA - Documentation

## 🎯 **PROJECT OVERVIEW**

**eTax Mobile PWA** là một Progressive Web App demo clone UI/UX 1:1 từ app gốc, với focus vào mobile-first design và cross-device data synchronization.

### **Mục tiêu chính:**
- ✅ **Clone UI/UX 1:1** từ app gốc (theo screenshot `tra cuu chung tu t.jpg`)
- ✅ **PWA hoàn chỉnh** với cross-device sync
- ✅ **Demo project** với dữ liệu mockup
- ✅ **Mobile-first** responsive design

---

## 🚀 **LIVE URLs**

| Service | URL | Credentials |
|---------|-----|-------------|
| **Main App** | `https://anhbao-373f3.web.app` | - |
| **Login** | `https://anhbao-373f3.web.app/login.html` | MST: `9999999999` / Pass: `firestore123` |
| **Admin** | `https://anhbao-373f3.web.app/admin.html` | User: `admin` / Pass: `Baoan2022` |
| **Firebase Console** | `https://console.firebase.google.com/project/anhbao-373f3/overview` | - |

---

## 🏗️ **PROJECT STRUCTURE**

```
etax-mobile-pwa-main/
├── 📁 Core Files
│   ├── admin.html              # Admin panel quản lý MST
│   ├── admin-login.html        # Login admin
│   ├── login.html              # Login user chính
│   ├── firebase.json           # Firebase hosting config
│   └── manifest.json          # PWA manifest
├── 📁 src/pages/
│   ├── index.html              # Trang chủ sau login
│   ├── tra-cuu-chung-tu.html   # Tra cứu chứng từ
│   ├── thietlap.html           # Thiết lập cá nhân
│   └── [other pages...]
├── 📁 css/                     # Stylesheets
├── 📁 assets/                  # Images, icons
├── 📁 ảnh gốc/                 # Reference screenshots
├── 📁 docs/                    # Documentation
└── 📁 scripts/
    ├── firebase-deploy.sh      # Auto deploy script
    └── deploy.sh              # Netlify deploy script
```

---

## 🔧 **TECH STACK**

| Technology | Purpose | Status |
|------------|---------|--------|
| **HTML5** | Structure | ✅ |
| **CSS3** | Styling | ✅ |
| **JavaScript ES6** | Logic | ✅ |
| **Firebase Firestore** | Database | ✅ |
| **Firebase Hosting** | Deployment | ✅ |
| **PWA** | Mobile experience | ✅ |
| **BroadcastChannel API** | Same-browser sync | ✅ |

---

## 🚀 **QUICK START**

### **1. Deploy to Firebase:**
```bash
./firebase-deploy.sh
```

### **2. Deploy to Netlify (backup):**
```bash
./deploy.sh
```

### **3. Local development:**
```bash
# Serve locally
python -m http.server 8000
# Or
npx serve .
```

---

## 📱 **KEY FEATURES**

### **✅ Authentication System**
- MST + Password login
- Admin panel với credentials riêng
- Session management với localStorage

### **✅ Cross-Device Sync**
- Firebase Firestore real-time sync
- BroadcastChannel cho same-browser sync
- Dual storage: localStorage + Firestore

### **✅ PWA Features**
- Service Worker
- Offline support
- Mobile-first responsive design
- Native app experience

### **✅ Admin Panel**
- Tạo/quản lý MST
- Upload PDF certificates
- Dashboard với statistics
- User management

---

## 🔍 **TROUBLESHOOTING**

### **Common Issues:**

1. **Firebase CLI version conflict:**
   ```bash
   # Use specific version
   npx firebase-tools@12.9.1 deploy --only hosting
   ```

2. **CORS errors:**
   - Đã fix bằng cách chuyển sang localStorage + Base64
   - Không cần Firebase Storage nữa

3. **Login không hoạt động:**
   - Check Firestore connection
   - Verify MST exists in database
   - Check localStorage data

---

## 📚 **DOCUMENTATION FILES**

- `docs/ARCHITECTURE.md` - System architecture
- `docs/API.md` - API documentation  
- `docs/DEPLOYMENT.md` - Deployment guide
- `docs/TROUBLESHOOTING.md` - Common issues
- `docs/DEVELOPMENT.md` - Development workflow

---

## 🎯 **NEXT STEPS**

1. **Performance optimization**
2. **Add more PWA features**
3. **Implement offline mode**
4. **Add push notifications**
5. **Mobile app store deployment**

---

**Last Updated:** 2025-01-19  
**Version:** 1.0.0  
**Status:** ✅ Production Ready