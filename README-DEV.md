# 🚀 eTax Mobile - Live Development Setup

## 🔥 Phương án 1: Live Development Server (Đang dùng)

### Cài đặt một lần:
```bash
npm install  # Đã chạy xong ✅
```

### Chạy development server:
```bash
# Chạy với hot reload (tự động refresh khi sửa code)
npm run dev

# Hoặc chạy server đơn giản
npm run serve
```

### 🌐 Truy cập:
- **Local:** http://localhost:3000/login.html
- **Network:** http://192.168.x.x:3000/login.html (để test trên điện thoại)

### ✨ Tính năng:
- ✅ Hot reload - sửa code là thấy ngay
- ✅ Không cần deploy mỗi lần sửa
- ✅ Hỗ trợ tất cả file: HTML, CSS, JS, assets
- ✅ PWA vẫn hoạt động bình thường

---

## 📱 Phương án 2: Remote Debugging (Để test trên điện thoại thật)

### Bước 1: Chuẩn bị
1. Kết nối máy tính và điện thoại cùng WiFi
2. Mở Chrome trên máy tính
3. Trên điện thoại: Mở Chrome → Địa chỉ → Nhập `chrome://inspect`

### Bước 2: Kết nối
1. Chạy `npm run dev` trên máy tính
2. Trên điện thoại mở URL network (ví dụ: http://192.168.1.100:3000/login.html)
3. Trên máy tính Chrome sẽ hiện thiết bị để inspect

### Bước 3: Debug
- ✅ Inspect elements ngay trên điện thoại
- ✅ Xem console log
- ✅ Không cần chia sẻ màn hình chính
- ✅ Debug network requests

---

## ⚡ Phương án 3: Auto Deploy (Để production)

```bash
# Deploy lên Firebase (như trước)
npm run firebase-deploy

# Hoặc dùng script có sẵn
./scripts/firebase-deploy.sh
```

---

## 🔧 Scripts hữu ích:

```bash
npm run dev          # Development với hot reload
npm run serve        # Server đơn giản
npm run firebase-deploy  # Deploy production
```

---

## 📝 Workflow mới (Siêu nhanh):

1. **Sửa code** → Lưu file
2. **Xem ngay** → Refresh trình duyệt (hoặc hot reload tự động)
3. **Test trên điện thoại** → Dùng remote debugging
4. **Khi xong** → Deploy production

**Tiết kiệm:** 80% thời gian so với cách cũ! 🚀

---

## 🆘 Troubleshooting:

**Lỗi "port 3000 bị chiếm":**
```bash
# Kill process đang dùng port 3000
sudo lsof -ti:3000 | xargs sudo kill

# Hoặc chạy trên port khác
npx live-server --port=3001
```

**Không thấy hot reload:**
- Đảm bảo file được lưu
- Check console có lỗi không
- Restart server nếu cần

---

**Anh test thử `npm run dev` đi ạ! Nếu có vấn đề gì em sửa ngay! 😊**
