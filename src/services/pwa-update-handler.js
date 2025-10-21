// src/services/pwa-update-handler.js

console.log('[PWA Update Handler] Script loaded.');

if ('serviceWorker' in navigator) {
    let newWorker;
    let updateFound = false;

    // 1. Đăng ký Service Worker
    navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
        .then(reg => {
            console.log('[PWA Update Handler] Service Worker registered. Scope:', reg.scope);

            // Theo dõi khi có worker mới đang chờ (waiting)
            reg.addEventListener('updatefound', () => {
                newWorker = reg.installing;
                if (newWorker) {
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // Có bản cập nhật mới và đã được cài đặt, nhưng worker cũ vẫn đang kiểm soát
                            console.log('[PWA Update Handler] Update available (new worker installed, waiting).');
                            if (!updateFound) {
                                showUpdateNotification();
                                updateFound = true; // Đảm bảo chỉ hiển thị 1 lần
                            }
                        }
                    });
                }
            });

            // Nếu có service worker đang hoạt động và không có worker mới cài đặt
            // Kiểm tra update thủ công sau 5s nếu app đã tải
            if (reg.active && !reg.installing) {
                 console.log('[PWA Update Handler] Active worker found, checking for updates in 5s...');
                setTimeout(() => {
                    reg.update();
                }, 5000);
            }

        })
        .catch(error => {
            console.error('[PWA Update Handler] Service Worker registration failed:', error);
        });

    // 2. Lắng nghe tin nhắn từ Service Worker (khi có controllerchange)
    navigator.serviceWorker.addEventListener('message', event => {
        if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
            console.log('[PWA Update Handler] Received UPDATE_AVAILABLE message from Service Worker.');
            if (!updateFound) {
                showUpdateNotification();
                updateFound = true;
            }
        }
    });

    // 3. Hiển thị thông báo cập nhật
    function showUpdateNotification() {
        console.log('[PWA Update Handler] Displaying update notification.');
        const notificationDiv = document.createElement('div');
        notificationDiv.id = 'pwa-update-notification';
        notificationDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            font-size: 14px;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 15px;
            max-width: 90%;
            opacity: 0;
            animation: fadeIn 0.5s forwards;
        `;
        notificationDiv.innerHTML = `
            <span>Có bản cập nhật mới!</span>
            <button id="pwa-update-button" style="
                background-color: #d62828;
                color: white;
                border: none;
                padding: 8px 15px;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
            ">Cập nhật ngay</button>
        `;
        document.body.appendChild(notificationDiv);

        // Thêm animation CSS
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes fadeIn {
                from { opacity: 0; } 
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        document.getElementById('pwa-update-button').addEventListener('click', () => {
            console.log('[PWA Update Handler] Update button clicked. Sending SKIP_WAITING.');
            notificationDiv.style.display = 'none'; // Ẩn thông báo
            // Gửi tin nhắn đến Service Worker để yêu cầu skipWaiting và kích hoạt worker mới
            if (newWorker) {
                newWorker.postMessage({ type: 'SKIP_WAITING' });
            }
            // Chờ một chút để worker mới kích hoạt, sau đó tải lại trang
            setTimeout(() => {
                window.location.reload(true);
            }, 500); 
        });
    }
}
