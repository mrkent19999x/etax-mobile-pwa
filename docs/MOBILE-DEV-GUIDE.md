# 📱 Mobile Development Guide - eTax PWA

## 🎯 **MOBILE DEVELOPMENT ENVIRONMENT**

### **Cách sử dụng môi trường development mobile:**

#### **1. Khởi động Server:**
```bash
# Cách 1: Python (Khuyến nghị)
python -m http.server 8080

# Cách 2: Node.js
npx http-server -p 8080

# Cách 3: PHP
php -S localhost:8080
```

#### **2. Mở Mobile Simulator:**
- **URL**: `http://localhost:8080/mobile-simulator.html`
- **Features**: iPhone mockup chuẩn, live preview
- **Controls**: Load page, refresh, fullscreen

#### **3. Mở Live Preview:**
- **URL**: `http://localhost:8080/live-preview.html`
- **Features**: Multiple devices, file browser, hot reload
- **Devices**: iPhone, iPhone Plus, iPhone Pro Max, Android

## 📱 **MOBILE DEVICES SUPPORTED**

### **iPhone Simulator:**
- **iPhone 14**: 375×812px (Default)
- **iPhone 14 Plus**: 414×896px
- **iPhone 14 Pro Max**: 428×926px
- **Features**: Notch, home indicator, status bar

### **Android Simulator:**
- **Standard**: 360×800px
- **Features**: No notch, rounded corners

## 🔥 **HOT RELOAD FEATURES**

### **Auto Refresh:**
- **CSS Changes**: Reload styles without page refresh
- **JS Changes**: Reload scripts automatically
- **HTML Changes**: Full page reload
- **File Changes**: Real-time updates

### **Live Preview:**
- **Real-time**: See changes instantly
- **Multi-device**: Test on different screen sizes
- **Touch Simulation**: Mobile gestures
- **PWA Testing**: Install and test PWA features

## 🛠️ **VS CODE INTEGRATION**

### **Tasks (Ctrl+Shift+P → Tasks: Run Task):**
- **Start PWA Server**: Khởi động server
- **Open Mobile Simulator**: Mở iPhone simulator
- **Open Live Preview**: Mở live preview với multiple devices
- **Lighthouse Audit**: Kiểm tra PWA performance

### **Launch Configurations (F5):**
- **Launch PWA in Chrome**: Debug trong Chrome
- **Launch PWA in Chrome (Mobile)**: Debug với mobile viewport
- **Launch PWA in Edge**: Debug trong Edge
- **Debug Service Worker**: Debug service worker

### **Extensions:**
- **Live Server**: Auto refresh khi save file
- **Mobile Preview**: Xem trước mobile
- **PWA Tools**: Debug PWA features
- **Lighthouse**: Performance audit

## 📱 **MOBILE TESTING WORKFLOW**

### **1. Development:**
```bash
# Terminal 1: Start server
python -m http.server 8080

# Terminal 2: Open mobile simulator
start http://localhost:8080/mobile-simulator.html
```

### **2. Live Preview:**
```bash
# Open live preview
start http://localhost:8080/live-preview.html

# Select device: iPhone, iPhone Plus, iPhone Pro Max, Android
# Select file: login.html, index.html, pages/*.html
# Auto refresh on file changes
```

### **3. PWA Testing:**
```bash
# Test PWA installation
# Test offline functionality
# Test service worker
# Test mobile gestures
```

## 🎨 **UX/UI TESTING**

### **Mobile Viewport:**
- **Width**: 360px - 430px
- **Height**: 640px - 926px
- **Orientation**: Portrait (default)
- **Touch**: Enabled

### **PWA Features:**
- **Installable**: Test app installation
- **Offline**: Test offline functionality
- **Splash Screen**: iOS/Android splash
- **App Shortcuts**: Quick actions
- **Push Notifications**: Test notifications

### **Touch Gestures:**
- **Swipe**: Left/right navigation
- **Pull to Refresh**: Refresh content
- **Pinch to Zoom**: Zoom functionality
- **Tap**: Button interactions
- **Long Press**: Context menus

## 🔧 **DEBUGGING MOBILE**

### **Chrome DevTools:**
1. **F12** → **Device Toolbar** (Ctrl+Shift+M)
2. **Select Device**: iPhone, Android, Custom
3. **Viewport**: 375×812 (iPhone 14)
4. **Throttling**: Slow 3G, Fast 3G, 4G
5. **Touch**: Enable touch events

### **Mobile Device Testing:**
1. **Connect Phone**: USB debugging
2. **Chrome Remote**: chrome://inspect
3. **Real Device**: Test on actual device
4. **Network**: Test on mobile network

### **PWA Debugging:**
1. **Application Tab**: Manifest, Service Worker
2. **Lighthouse**: PWA audit
3. **Network Tab**: Offline testing
4. **Console**: JavaScript errors

## 📊 **PERFORMANCE TESTING**

### **Lighthouse Audit:**
```bash
# Run Lighthouse audit
lighthouse http://localhost:8080 --output=html --output-path=./lighthouse-report.html

# Mobile-specific audit
lighthouse http://localhost:8080 --form-factor=mobile --throttling-method=devtools
```

### **Target Scores:**
- **Performance**: ≥95
- **Accessibility**: ≥95
- **Best Practices**: ≥95
- **SEO**: ≥95
- **PWA**: 100%

## 🚀 **DEPLOYMENT TESTING**

### **Local Testing:**
1. **HTTPS**: Test with HTTPS (localhost OK)
2. **Service Worker**: Test offline functionality
3. **Manifest**: Test app installation
4. **Icons**: Test app icons

### **Production Testing:**
1. **Real Domain**: Test with real domain
2. **HTTPS**: Test with HTTPS
3. **Mobile Devices**: Test on real devices
4. **Network**: Test on mobile network

## 💡 **TIPS & TRICKS**

### **Development Tips:**
- **Use Live Preview**: See changes instantly
- **Test Multiple Devices**: iPhone, Android
- **Check PWA Features**: Install, offline, notifications
- **Performance**: Keep Lighthouse scores high

### **Mobile Tips:**
- **Touch Targets**: Minimum 44px
- **Text Size**: Minimum 16px
- **Contrast**: High contrast for readability
- **Loading**: Fast loading times

### **PWA Tips:**
- **Offline First**: Design for offline
- **App-like**: Native app experience
- **Installable**: Easy installation
- **Engaging**: Keep users engaged

---

**📱 Mobile Development Environment Ready!**  
**🔥 Hot Reload + Live Preview + PWA Testing**
