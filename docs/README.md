# 🏛️ eTax Mobile PWA - Clone UX/UI Chuẩn Mobile

## 📋 **TỔNG QUAN DỰ ÁN**

**eTax Mobile PWA** là ứng dụng thuế điện tử di động được clone 100% từ giao diện eTax chính thức, tối ưu cho PWA (Progressive Web App) với trải nghiệm native mobile.

### 🎯 **MỤC TIÊU**
- **Clone 100% UX/UI** từ eTax chính thức
- **PWA chuẩn** - Installable, offline-first, native feel
- **Mobile-first** - Tối ưu cho iOS/Android
- **Performance cao** - Lighthouse ≥95 điểm
- **Demo hoàn chỉnh** - Không cần backend

## 🚀 **TÍNH NĂNG CHÍNH**

### 📱 **PWA Features**
- ✅ **Installable** - Cài đặt như app native
- ✅ **Offline-first** - Hoạt động không internet
- ✅ **Splash screen** - iOS/Android splash
- ✅ **App shortcuts** - Khai thuế, Nộp thuế, Tra cứu
- ✅ **Push notifications** - Thông báo thuế

### 🎨 **UX/UI Features**
- ✅ **Native gestures** - Swipe back, pull-to-refresh
- ✅ **Smooth transitions** - 60fps animations
- ✅ **Dark mode** - Chế độ tối
- ✅ **Responsive** - 360px-430px viewport
- ✅ **Accessibility** - A11y compliant

### 🛠️ **Admin Features**
- ✅ **Visual Editor** - Drag & drop với GrapesJS
- ✅ **Template Manager** - Tạo template với Monaco Editor
- ✅ **Content Management** - Quản lý nội dung động

## 📁 **CẤU TRÚC DỰ ÁN**

```
resi/
├── index.html              # Entry point chính
├── manifest.json           # PWA manifest
├── service-worker.js       # PWA service worker
├── favicon.ico            # App icon
├── assets/                # 92 ảnh tối ưu
│   ├── logo.png
│   ├── icon1-13.png
│   └── ...
├── css/                   # Stylesheets
│   ├── styles.css         # Main styles
│   ├── home.css           # Home page
│   ├── login.css          # Login page
│   └── themes/            # Dark/Light themes
├── js/                    # JavaScript
│   ├── app.js             # Main app logic
│   ├── login.js           # Authentication
│   └── ...
├── pages/                 # 25 trang user
│   ├── login.html
│   ├── khaithue.html
│   ├── nopthue.html
│   └── ...
├── admin-essential/       # 3 trang admin quan trọng
│   ├── admin-editor.html  # Visual editor
│   ├── admin-template.html # Template manager
│   └── admin-placeholder.html # Content management
└── ảnh gốc/              # 20 ảnh gốc để clone
```

## 🛠️ **TECH STACK**

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **PWA**: Service Worker, Web App Manifest
- **Editor**: GrapesJS (Visual), Monaco Editor (Code)
- **Icons**: Font Awesome 6.4.0
- **Storage**: localStorage (không cần backend)

## 🚀 **CÁCH CHẠY DỰ ÁN**

### **Cách 1: Mở trực tiếp**
```bash
# Mở file index.html trong browser
open index.html
```

### **Cách 2: Local server (khuyến nghị)**
```bash
# Python
python -m http.server 8080

# Node.js
npx http-server -p 8080

# PHP
php -S localhost:8080
```

### **Cách 3: Live Server (VS Code)**
- Cài extension "Live Server"
- Right-click index.html → "Open with Live Server"

## 📱 **CÁCH CÀI ĐẶT PWA**

### **Trên Mobile:**
1. Mở website trong browser
2. Tap "Add to Home Screen" hoặc "Install App"
3. App sẽ xuất hiện trên home screen

### **Trên Desktop:**
1. Mở website trong Chrome/Edge
2. Click icon "Install" trên address bar
3. App sẽ cài đặt như desktop app

## 🎨 **CÁCH TÙY CHỈNH GIAO DIỆN**

### **Admin Panel:**
- Truy cập: `/admin-essential/admin-editor.html`
- **Visual Editor**: Drag & drop components
- **Template Manager**: Tạo template mới
- **Content Management**: Quản lý nội dung

### **Thay đổi màu sắc:**
- Sửa file `css/themes/` để thay đổi theme
- Sửa CSS variables trong `:root`

### **Thay đổi nội dung:**
- Sửa file HTML trong thư mục `pages/`
- Sử dụng admin panel để quản lý nội dung động

## 🔧 **TỐI ƯU HÓA**

### **Performance:**
- ✅ Lazy loading images
- ✅ Minified CSS/JS
- ✅ Service Worker caching
- ✅ Critical CSS inline

### **PWA:**
- ✅ Manifest.json chuẩn
- ✅ Service Worker offline
- ✅ App shortcuts
- ✅ Splash screen

### **Mobile:**
- ✅ Touch gestures
- ✅ Viewport meta tag
- ✅ iOS Safari fixes
- ✅ Android Chrome fixes

## 📊 **LIGHTHOUSE SCORES**

| Metric | Target | Current |
|--------|--------|---------|
| Performance | ≥95 | 🎯 |
| Accessibility | ≥95 | 🎯 |
| Best Practices | ≥95 | 🎯 |
| SEO | ≥95 | 🎯 |
| PWA | 100% | 🎯 |

## 🐛 **TROUBLESHOOTING**

### **PWA không cài được:**
- Kiểm tra HTTPS (localhost OK)
- Kiểm tra manifest.json
- Kiểm tra service worker

### **Ảnh không hiển thị:**
- Kiểm tra đường dẫn trong `assets/`
- Kiểm tra service worker cache

### **Admin không hoạt động:**
- Kiểm tra console errors
- Kiểm tra CDN links (GrapesJS, Monaco)

## 📝 **CHANGELOG**

### **v1.0.0** (Hiện tại)
- ✅ Clone 100% UX/UI eTax
- ✅ PWA chuẩn với manifest + service worker
- ✅ 25 trang user hoàn chỉnh
- ✅ 3 trang admin tùy chỉnh
- ✅ Mobile-first responsive
- ✅ Dark mode support

## 👥 **CONTRIBUTORS**

- **Nghĩa** - Project Owner & UX/UI Design
- **Cipher** - AI Assistant & Development

## 📄 **LICENSE**

MIT License - Sử dụng tự do cho mục đích demo và học tập.

---

**🏛️ eTax Mobile PWA - Clone UX/UI Chuẩn Mobile**  
**📱 PWA Demo hoàn chỉnh - Không cần backend**
