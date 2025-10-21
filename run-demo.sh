#!/bin/bash

# Auto Demo Login Script - eTax Mobile
echo "🤖 Bắt đầu Auto Demo Login..."

# Get local IP
LOCAL_IP=$(hostname -I | awk '{print $1}')
echo "📱 IP Address: $LOCAL_IP"

# Check if server is running
if curl -s "http://localhost:8084/auto-demo-login.html" | grep -q "Auto Demo Login"; then
    echo "✅ Server đang chạy trên port 8084"
else
    echo "❌ Server không chạy, đang khởi động..."
    python3 -m http.server 8084 &
    sleep 3
fi

echo ""
echo "🎯 DEMO ĐÃ SẴN SÀNG!"
echo "================================"
echo "📱 URL cho điện thoại:"
echo "   http://$LOCAL_IP:8084/auto-demo-login.html"
echo ""
echo "🔐 URL đăng nhập:"
echo "   http://$LOCAL_IP:8084/login.html"
echo ""
echo "📋 Thông tin đăng nhập:"
echo "   MST: 1221995"
echo "   Mật khẩu: 123456"
echo ""
echo "🚀 Các bước demo:"
echo "1. Vào URL auto-demo-login.html"
echo "2. Click 'Bắt đầu Demo'"
echo "3. Xem em tự động tạo MST và test đăng nhập"
echo "4. Sau đó vào login.html để đăng nhập thật"
echo ""
echo "⏰ Server sẽ chạy cho đến khi anh Ctrl+C"
echo "================================"

# Keep server running
wait
