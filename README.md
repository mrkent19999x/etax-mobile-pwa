# eTax Mobile PWA

**Clone 100% UX/UI eTax chính thức thành PWA tĩnh, tối ưu cho mobile với trải nghiệm native.**

## 🚀 Quick Start

```bash
# Chạy development server
python3 -m http.server 8080

# Truy cập
http://127.0.0.1:8080/login.html
```

## 📁 Cấu trúc dự án

```
etax-mobile-pwa/
├── login.html              # Entry point - Trang login
├── manifest.json           # PWA manifest
├── service-worker.js       # PWA service worker
├── favicon.ico             # Favicon
├── assets/                 # 187 ảnh tối ưu
├── css/                    # Stylesheets minified
├── src/                    # Source code
│   ├── pages/              # 25 trang user + dashboard ( ở đây là index.html ĐĐ Đ bỏ ngay cái tên file dashboard đi 
│   ├── admin-essential/    # 4 trang admin
│   └── services/           # JavaScript services
├── dev/                    # Development tools (3 files)
├── docs/                   # Documentation
├── scripts/                # Build scripts
└── ảnh gốc/               # Reference images
```

## 🎯 Tính năng

- ✅ **PWA chuẩn** - Installable, offline-first
- ✅ **Mobile-first** - Tối ưu cho iOS/Android (360px-430px)
- ✅ **25 trang user** - Clone 100% eTax chính thức
- ✅ **4 trang admin** - Essential admin tools
- ✅ **Performance cao** - Critical CSS inline, minified assets
- ✅ **Native feel** - Touch gestures, haptic feedback

## 🛠️ Development

```bash
# Chạy server
./scripts/start-dev-server.sh

# Mobile simulator
http://127.0.0.1:8080/dev/mobile-simulator.html

# Super dev hub
http://127.0.0.1:8080/dev/super-dev-hub.html
```

## 📱 PWA Features

- **Installable** trên mobile/desktop
- **Offline-first** hoạt động
- **App shortcuts** - Khai thuế, Nộp thuế, Tra cứu
- **Splash screen** cho iOS/Android
- **Push notifications** (sẵn sàng)

## 🎨 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **PWA**: Service Worker, Web App Manifest
- **Editor**: GrapesJS (Visual), Monaco Editor (Code)
- **Storage**: localStorage (không cần backend)

## 📊 Performance

- **Lighthouse**: ≥95 điểm mục tiêu
- **Critical CSS**: Inline cho loading nhanh
- **Assets**: 187 ảnh tối ưu (WebP + PNG)
- **Minified**: CSS/JS đã minify

---

**📱 eTax Mobile PWA - Demo hoàn chỉnh không cần backend**
