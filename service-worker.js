const CACHE_NAME = 'etax-mobile-pwa-cache-v1.3'; // Tăng version cache khi có thay đổi quan trọng
const urlsToCache = [
  '/',
  '/index.html',
  '/login.html',
  '/manifest.json',
  '/service-worker.js',
  '/assets/logo.webp',
  '/assets/icon-qr.png',
  '/assets/icon-bell.png',
  '/assets/avatar.png',
  '/assets/nutha.png',
  '/assets/2gach.png',
  '/assets/arrow-left.png',
  '/assets/arrow-right.png',
  '/assets/sidebar/nen.png',
  '/assets/sidebar/slidebg.png',
  '/assets/sidebar/menu.png',
  '/assets/sidebar/home.png',
  '/assets/sidebar/hoadon.png',
  '/assets/sidebar/khaithue.png',
  '/assets/sidebar/dkthue.png',
  '/assets/sidebar/qtt.png',
  '/assets/sidebar/nopthue.png',
  '/assets/sidebar/nghiavu.png',
  '/assets/sidebar/thongbao.png',
  '/assets/sidebar/tienich.png',
  '/assets/sidebar/hotro.png',
  '/assets/sidebar/thietlap.png',
  '/assets/bglogin.png',
  '/assets/icon-mst-new.svg',
  '/assets/icon-password-new.svg',
  '/assets/icon-eye.svg',
  '/assets/icon-eye-closed.svg',
  '/assets/faceid1.png',
  '/assets/vnid.png',
  '/assets/chiase.png',
  '/assets/quick-actions/icon1.png', // Quick Action icons
  '/assets/quick-actions/icon2.png',
  '/assets/quick-actions/icon3.png',
  '/assets/quick-actions/icon4.png',
  '/assets/services/index1.png', // Service Grid icons
  '/assets/services/index2.png',
  '/assets/services/index3.png',
  '/assets/services/index4.png',
  '/assets/services/index5.png',
  '/assets/services/index6.png',
  '/assets/services/index7.png',
  '/assets/services/index8.png',
  '/assets/services/index9.png',
  '/assets/services/index10.png',
  '/assets/back.png', // Back icon
  
  // CSS files
  '/css/shared-layout.css',
  '/css/home-v2.css',
  
  // JS files
  '/js/home-v2.js',
  '/src/services/auth-guard.min.js',
  '/src/services/pwa-update-handler.js', // Đảm bảo file này được cache
  
  // Pages
  '/src/pages/index.html',
  '/src/pages/chi-tiet-thong-bao.html',
  '/src/pages/dangky.html',
  '/src/pages/doimatkhau.html',
  '/src/pages/ho-tro-qtt.html',
  '/src/pages/ho-tro-qtthue.html',
  '/src/pages/hoadondt.html',
  '/src/pages/hoso.html',
  '/src/pages/hotro.html',
  '/src/pages/hsdkythue.html',
  '/src/pages/khaithue.html',
  '/src/pages/nghiavu.html',
  '/src/pages/nopthue.html',
  '/src/pages/pdf-viewer.html',
  '/src/pages/thaydoittdkthue.html',
  '/src/pages/thietlap.html',
  '/src/pages/thongbao.html',
  '/src/pages/thongtin-chitiet.html',
  '/src/pages/thongtin.html',
  '/src/pages/thongtinnvt.html',
  '/src/pages/tienich.html',
  '/src/pages/tra-cuu-chung-tu.html',
  '/src/pages/tracuttnpt.html',
  '/src/pages/van-tay.html',
];

// Cache on install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching all content');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('[Service Worker] Cache addAll failed:', error);
      })
  );
  self.skipWaiting(); // Kích hoạt ngay lập tức
});

// Serve from cache, then fetch from network (stale-while-revalidate)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Ưu tiên cache
      if (cachedResponse) {
        // console.log('[Service Worker] Serving from cache:', event.request.url);
        return cachedResponse;
      }
      
      // Nếu không có trong cache, fetch từ network
      // console.log('[Service Worker] Fetching from network:', event.request.url);
      return fetch(event.request).then((networkResponse) => {
        // Thêm response mới vào cache để dùng cho lần sau
        return caches.open(CACHE_NAME).then((cache) => {
          // Chỉ cache các request GET thành công
          if (event.request.method === 'GET' && networkResponse.ok) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });
      }).catch((error) => {
        console.error('[Service Worker] Fetch failed:', event.request.url, error);
        // Fallback cho các trường hợp offline và không có trong cache
        // Ví dụ: trả về một trang offline tùy chỉnh
        if (event.request.mode === 'navigate') {
          return caches.match('/offline.html'); // Tạo một trang offline.html
        }
        return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
      });
    })
  );
});


// Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Đảm bảo Service Worker kiểm soát tất cả clients ngay lập tức
});

// =========================================================
// PWA Update Notification Logic
// =========================================================

// Lắng nghe sự kiện skipWaiting từ client (khi người dùng muốn update)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
    console.log('[Service Worker] Skip waiting requested and performed.');
  }
});

self.addEventListener('controllerchange', () => {
  // Khi một service worker mới được kích hoạt và trở thành controller
  // Gửi thông báo đến tất cả clients rằng đã có bản cập nhật
  console.log('[Service Worker] New service worker activated, notifying clients...');
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({ type: 'UPDATE_AVAILABLE' });
    });
  });
});
