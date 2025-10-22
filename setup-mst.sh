#!/bin/bash

echo "🚀 Đang tạo MST 1221995 cho anh Nghĩa..."

# Mở trang tạo MST trong browser
echo "📱 Mở trang tạo MST..."
xdg-open "http://localhost:8082/create-mst-simple.html" 2>/dev/null || \
firefox "http://localhost:8082/create-mst-simple.html" 2>/dev/null || \
google-chrome "http://localhost:8082/create-mst-simple.html" 2>/dev/null || \
echo "⚠️ Không thể mở browser tự động. Vui lòng mở: http://localhost:8082/create-mst-simple.html"

echo ""
echo "⏳ Chờ 5 giây để MST được tạo..."
sleep 5

echo ""
echo "🔗 Link đăng nhập chính thức:"
echo "   http://localhost:8082/login.html"
echo ""
echo "📋 Thông tin đăng nhập:"
echo "   MST: 1221995"
echo "   Mật khẩu: 123456"
echo "   Tên: NGUYỄN VĂN NGHĨA"
echo ""
echo "✅ Anh có thể đăng nhập trên điện thoại ngay bây giờ!"
