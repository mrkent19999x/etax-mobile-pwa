# 🔄 eTax Mobile PWA - Workflow Chuẩn

## 🎯 **NGUYÊN TẮC CƠ BẢN**

### **1. LUÔN ĐỌC GỐC TRƯỚC KHI THAY ĐỔI**
- ✅ Đọc `rules.mdc` để hiểu cấu trúc chuẩn
- ✅ Đọc `PROGRESS.md` để biết trạng thái hiện tại
- ✅ Scan cấu trúc thư mục thực tế
- ✅ Phân tích dependencies và references

### **2. PHÂN TÍCH TRƯỚC KHI HÀNH ĐỘNG**
- ✅ Xác định mục tiêu rõ ràng
- ✅ Đánh giá tác động đến toàn bộ hệ thống
- ✅ Lập kế hoạch thay đổi từng bước
- ✅ Dự đoán các vấn đề có thể xảy ra

### **3. THAY ĐỔI CÓ HỆ THỐNG**
- ✅ Thay đổi từng file một cách có thứ tự
- ✅ Test ngay sau mỗi thay đổi
- ✅ Cập nhật references liên quan
- ✅ Đảm bảo không phá vỡ chức năng hiện có

### **4. CẬP NHẬT DOCS SAU MỖI THAY ĐỔI**
- ✅ Cập nhật `PROGRESS.md` với thay đổi mới
- ✅ Cập nhật `rules.mdc` nếu cấu trúc thay đổi
- ✅ Cập nhật `CHAT-HISTORY.md` với tóm tắt
- ✅ Commit với message rõ ràng

## 📋 **WORKFLOW CHI TIẾT**

### **Khi nhận yêu cầu mới:**

1. **📖 ĐỌC & PHÂN TÍCH**
   ```bash
   # Đọc rules chuẩn
   cat rules.mdc
   
   # Đọc progress hiện tại
   cat docs/PROGRESS.md
   
   # Scan cấu trúc thực tế
   find . -name "*.html" -type f | head -10
   ```

2. **🎯 XÁC ĐỊNH MỤC TIÊU**
   - Mục tiêu cụ thể là gì?
   - Tác động đến files nào?
   - Có vi phạm quy tắc nào không?
   - Cần cập nhật docs gì?

3. **📝 LẬP KẾ HOẠCH**
   - Tạo TODO list chi tiết
   - Ưu tiên thứ tự thực hiện
   - Dự đoán rủi ro và cách xử lý

4. **🔧 THỰC HIỆN**
   - Thay đổi từng bước nhỏ
   - Test ngay sau mỗi thay đổi
   - Cập nhật references liên quan

5. **📊 CẬP NHẬT DOCS**
   - Cập nhật PROGRESS.md
   - Cập nhật rules.mdc nếu cần
   - Ghi nhật ký vào CHAT-HISTORY.md

## 🚨 **CÁC LỖI THƯỜNG GẶP**

### **❌ KHÔNG ĐỌC GỐC TRƯỚC**
- Thay đổi mà không biết cấu trúc hiện tại
- Vi phạm quy tắc đã định sẵn
- Tạo ra conflicts và inconsistencies

### **❌ THAY ĐỔI QUÁ NHIỀU CÙNG LÚC**
- Khó debug khi có lỗi
- Không biết thay đổi nào gây vấn đề
- Khó rollback khi cần thiết

### **❌ KHÔNG CẬP NHẬT DOCS**
- Team members không biết thay đổi
- Mất track progress
- Tạo ra confusion và conflicts

## ✅ **CHECKLIST TRƯỚC KHI COMMIT**

- [ ] Đã đọc rules.mdc và PROGRESS.md
- [ ] Đã scan cấu trúc thực tế
- [ ] Đã test tất cả thay đổi
- [ ] Đã cập nhật tất cả references
- [ ] Đã cập nhật PROGRESS.md
- [ ] Đã cập nhật rules.mdc (nếu cần)
- [ ] Đã ghi nhật ký vào CHAT-HISTORY.md
- [ ] Commit message rõ ràng và chi tiết

## 🎯 **MỤC TIÊU WORKFLOW**

**Đảm bảo mọi thay đổi đều:**
- ✅ Tuân thủ quy tắc chuẩn
- ✅ Không phá vỡ chức năng hiện có
- ✅ Được document đầy đủ
- ✅ Có thể trace và rollback
- ✅ Team members hiểu rõ

---

**🔄 Workflow chuẩn - Đảm bảo chất lượng và consistency**
