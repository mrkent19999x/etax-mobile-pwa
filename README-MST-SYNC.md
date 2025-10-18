# 🏗️ Hệ thống đồng bộ dữ liệu theo MST - eTax Mobile

## 📋 Tổng quan

Hệ thống cho phép đồng bộ toàn bộ dữ liệu người dùng dựa trên **Mã số thuế (MST)**. Khi đăng nhập với MST, tất cả các trang sẽ tự động hiển thị thông tin tương ứng với MST đó.

## 🎯 Tính năng chính

### ✅ Đã hoàn thành:
- **Đồng bộ dữ liệu theo MST** - Tất cả thông tin theo MST
- **Quản lý MST tập trung** - Thêm, sửa, xóa MST dễ dàng
- **Layout chuẩn PWA** - Giao diện chuẩn mobile app
- **Ẩn chức năng không cần** - Chỉ giữ lại chức năng cần thiết
- **Background full màn hình** - Không bị che chắn

### 📄 Các trang đã đồng bộ:
1. **login.html** - Đăng nhập và xác thực MST
2. **src/pages/index.html** - Hiển thị MST và tên người dùng
3. **src/pages/thongtin.html** - Thông tin tài khoản cá nhân
4. **src/pages/thongtinnvt.html** - Thông tin nghĩa vụ thuế
5. **src/pages/thongtin-chitiet.html** - Chi tiết thuế cụ thể

## 🚀 Cách sử dụng

### 1. Truy cập trang Admin
```
http://127.0.0.1:5500/admin.html
```

### 2. Thêm MST mới
- Điền đầy đủ thông tin: MST, Tên, Địa chỉ, Cơ quan thuế, v.v.
- Nhập thông tin thuế (tổng tiền, đã nộp, còn phải nộp)
- Click **"Thêm người dùng"**

### 3. Test đồng bộ dữ liệu
- Click nút **"Test Đăng nhập"** với MST vừa tạo
- Kiểm tra thông tin ở các trang khác nhau
- Tất cả sẽ hiển thị đồng bộ theo MST

## 📊 Dữ liệu mẫu có sẵn

| MST | Tên | Tổng thuế | Trạng thái |
|-----|-----|-----------|------------|
| `0123456789` | NGUYỄN VĂN A | 3,750,000 VND | ✅ Sẵn sàng |
| `8198700370` | TRẦN THÀNH PHÚC | 5,000,000 VND | ✅ Sẵn sàng |
| `001095000163` | NGUYỄN TRUNG NGHĨA | 1,800,000 VND | ✅ Sẵn sàng |

## 🔧 Cấu trúc hệ thống

### 📁 File hệ thống:
```
📄 Hệ thống quản lý dữ liệu:
├── src/services/data-manager.js (Quản lý dữ liệu tập trung)
├── src/services/user-data-models.js (Định nghĩa cấu trúc)
└── admin.html (Trang quản lý MST)

📄 Các trang ứng dụng:
├── login.html (Đăng nhập)
├── src/pages/index.html (Trang chủ)
├── src/pages/thongtin.html (Thông tin cá nhân)
├── src/pages/thongtinnvt.html (Nghĩa vụ thuế)
└── src/pages/thongtin-chitiet.html (Chi tiết thuế)
```

### 🔄 Luồng đồng bộ:

```
1. Đăng nhập MST → 2. Load dữ liệu → 3. Đồng bộ UI → 4. Hiển thị thông tin
     ↓                    ↓                    ↓              ↓
• Kiểm tra MST      • Lấy từ Data      • Cập nhật tất   • Đúng theo MST
• Xác thực mật khẩu    Manager            cả các trang
• Lưu session
```

## 🧪 Test đồng bộ dữ liệu

### Bước 1: Test MST có sẵn
1. Vào `login.html`
2. Nhập MST: `0123456789`
3. Nhập mật khẩu bất kỳ
4. Đăng nhập thành công

### Bước 2: Kiểm tra đồng bộ
1. **Trang chủ** (`index.html`): Hiển thị MST và tên
2. **Thông tin cá nhân** (`thongtin.html`): Thông tin đầy đủ
3. **Nghĩa vụ thuế** (`thongtinnvt.html`): Danh sách thuế
4. **Chi tiết thuế** (`thongtin-chitiet.html`): Thông tin chi tiết

### Bước 3: Test MST khác
1. Đăng xuất
2. Đăng nhập với MST `8198700370`
3. Kiểm tra thông tin thay đổi theo MST mới

## 📝 Cách thêm MST mới

### Sử dụng Admin Panel:
1. Vào `admin.html`
2. Điền thông tin MST mới
3. Click **"Thêm người dùng"**
4. Test ngay với nút **"Test Đăng nhập"**

### Chỉnh sửa trực tiếp:
1. Mở `src/services/data-manager.js`
2. Thêm MST mới vào `initializeDefaultData()`
3. Refresh trang để load dữ liệu mới

## 🔍 Debug và Monitoring

### Console Log để theo dõi:
```javascript
✅ Data Manager initialized with X MST records
✅ Page initialized with synced data for MST: XXX
✅ UI updated for user: TÊN NGƯỜI DÙNG
✅ Tax info loaded from Data Manager
```

### Kiểm tra dữ liệu:
- Mở Developer Tools (F12)
- Vào tab Console
- Theo dõi quá trình đồng bộ

## ⚙️ Cấu hình nâng cao

### Thêm trường thông tin mới:
1. Cập nhật `UserData` model trong `user-data-models.js`
2. Cập nhật `data-manager.js` với trường mới
3. Cập nhật các trang để hiển thị trường mới

### Thay đổi format dữ liệu:
1. Sửa `DataUtils` class trong `user-data-models.js`
2. Cập nhật validation rules
3. Test với dữ liệu mới

## 🚨 Lưu ý quan trọng

### ✅ Đã hoạt động tốt:
- Đăng nhập với MST đúng định dạng (10-13 số)
- Mật khẩu có thể nhập bất kỳ
- Dữ liệu đồng bộ tự động theo MST
- Layout chuẩn PWA, responsive

### ❌ Cần tránh:
- Không đổi tên các file hệ thống
- Không xóa `src/services/data-manager.js`
- Không thay đổi cấu trúc dữ liệu hiện tại

## 🎯 Trạng thái hiện tại

| ✅ | Tính năng | Trạng thái |
|----|-----------|------------|
| ✅ | Đăng nhập MST | Hoàn thành |
| ✅ | Đồng bộ dữ liệu | Hoàn thành |
| ✅ | Quản lý MST | Hoàn thành |
| ✅ | Layout PWA | Hoàn thành |
| ✅ | Background full | Hoàn thành |
| ✅ | Ẩn chức năng | Hoàn thành |

## 📞 Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra Console Log (F12)
2. Xem thông báo lỗi chi tiết
3. Kiểm tra định dạng MST (10-13 số)
4. Refresh trang và thử lại

---

**🎉 Hệ thống đồng bộ dữ liệu theo MST đã sẵn sàng sử dụng!**

Bạn có thể bắt đầu test ngay bây giờ với các MST có sẵn hoặc tạo MST mới qua trang Admin.
