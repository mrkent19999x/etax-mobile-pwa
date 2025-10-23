# 🚀 Hướng dẫn Setup GitHub Actions cho Auto Deploy

## ✅ Đã hoàn thành:
- Tạo file `.github/workflows/deploy.yml`
- Cấu hình auto deploy cho các nhánh: `main`, `master`, `pro`, `cursor/deploy-to-pro-branch-f17e`

## 🔧 Bước tiếp theo (Anh cần làm):

### 1. Lấy Firebase Token
```bash
# Chạy trên máy PC của anh
firebase login:ci
```
- Copy token được tạo ra

### 2. Thêm Token vào GitHub Secrets
1. Vào GitHub repo: `https://github.com/tranphuc21995-bit/etaxfinal`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `FIREBASE_TOKEN`
5. Value: Paste token từ bước 1
6. Click **Add secret**

### 3. Test Deploy
- Push code lên nhánh `pro` hoặc `main`
- GitHub Actions sẽ tự động chạy
- Xem kết quả tại: **Actions** tab trong GitHub

## 🎯 Cách sử dụng sau này:
1. **Chỉnh sửa code** trên máy anh
2. **Commit & Push** lên GitHub:
   ```bash
   git add .
   git commit -m "Update feature X"
   git push origin pro
   ```
3. **GitHub tự động deploy** - không cần ngồi PC! 🎉

## 📋 Workflow Details:
- **Trigger**: Push hoặc Pull Request
- **Branches**: main, master, pro, cursor/deploy-to-pro-branch-f17e
- **Platform**: Ubuntu Latest
- **Node.js**: Version 18
- **Deploy**: Firebase Hosting

## 🔍 Monitor Deploy:
- Vào **Actions** tab để xem log
- Nếu lỗi, sẽ có thông báo chi tiết
- Deploy thành công sẽ có link Firebase Hosting