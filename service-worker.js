const CACHE_NAME = 'etax-mobile-v1.1.0';
const RUNTIME_IMG_CACHE = 'etax-img-v1';
const RUNTIME_FONT_CACHE = 'etax-font-v1';
const RUNTIME_CSS_CACHE = 'etax-css-v1';
const RUNTIME_JSON_CACHE = 'etax-json-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/login.html',
  '/manifest.json',
  '/favicon.ico',
  // CSS used on entry pages
  '/css/home.css',
  '/css/login-original.css',
  '/css/user-interface-manager.css',
  // Core assets
  '/assets/logo.png',
  // Priority feature pages (precache for offline speed)
  // Root-level routes (may be referenced by UI)
  '/khaithue.html',
  '/nopthue.html',
  '/tra-cuu-chung-tu.html',
  '/tracuttnpt.html',
  // Actual file locations under src/pages
  '/src/pages/khaithue.html',
  '/src/pages/nopthue.html',
  '/src/pages/tra-cuu-chung-tu.html',
  '/src/pages/tracuttnpt.html',
  '/src/pages/thongbao.html',
  '/src/pages/dangky.html',
  '/src/pages/hotro.html',
  '/src/pages/thietlap.html',
  '/src/pages/hoso.html',
  '/src/pages/nghiavu.html',
  '/src/pages/tienich.html',
  '/src/pages/ho-tro-qtt.html',
  '/src/pages/hoadondt.html',
  '/src/pages/doimatkhau.html',
  '/src/pages/van-tay.html',
  '/src/pages/thaydoittdkthue.html',
  '/src/pages/hsdkythue.html',
  '/src/pages/page-thongbao.html',
  '/src/pages/chi-tiet-thong-bao.html',
  '/src/pages/thongtin.html',
  '/src/pages/thongtin-chitiet.html',
  '/src/pages/index.html'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(CACHE_NAME);
      await Promise.all(urlsToCache.map(async (url) => {
        try {
          await cache.add(url);
        } catch (e) {
          console.warn('Skip caching:', url, e);
        }
      }));
    } catch (err) {
      console.warn('Cache install encountered errors:', err);
    }
  })());
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keep = new Set([
      CACHE_NAME,
      RUNTIME_IMG_CACHE,
      RUNTIME_FONT_CACHE,
      RUNTIME_CSS_CACHE,
      RUNTIME_JSON_CACHE,
    ]);
    const names = await caches.keys();
    await Promise.all(names.map(name => {
      if (!keep.has(name)) {
        console.log('Deleting old cache:', name);
        return caches.delete(name);
      }
    }));
  })());
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // 🔧 FIX: Skip unsupported schemes (chrome-extension, etc.)
  const url = new URL(event.request.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return; // Don't handle chrome-extension:// or other schemes
  }

  // Only handle GET
  if (event.request.method !== 'GET') return;

  // Runtime strategies per resource type
  const dest = event.request.destination;
  if (dest === 'image') {
    event.respondWith(handleImageRequest(event));
    return;
  }
  if (dest === 'font') {
    event.respondWith(handleFontRequest(event.request));
    return;
  }
  if (dest === 'style') {
    event.respondWith(handleStyleRequest(event.request));
    return;
  }
  const accept = event.request.headers.get('accept') || '';
  if (accept.includes('application/json') || url.pathname.endsWith('.json')) {
    event.respondWith(handleJsonRequest(event.request));
    return;
  }

  // Helper: alias certain routes to actual files in /src/pages
  function getAliasPaths(u) {
    const paths = [];
    const pathname = u.pathname;
    // Map /user/*.html -> /src/pages/*.html
    const userMatch = pathname.match(/^\/user\/(.+\.html)$/);
    if (userMatch) {
      paths.push(`/src/pages/${userMatch[1]}`);
    }
    // Map root-level known routes -> /src/pages counterpart
    const known = [
      'khaithue.html', 'nopthue.html', 'tra-cuu-chung-tu.html', 'tracuttnpt.html',
      'thongbao.html', 'dangky.html', 'hotro.html', 'thietlap.html', 'hoso.html',
      'nghiavu.html', 'tienich.html', 'ho-tro-qtt.html', 'hoadondt.html',
      'doimatkhau.html', 'van-tay.html', 'thaydoittdkthue.html', 'hsdkythue.html',
      'page-thongbao.html', 'chi-tiet-thong-bao.html', 'thongtin.html', 'thongtin-chitiet.html'
    ];
    const base = pathname.replace(/^\//, '');
    if (known.includes(base)) {
      paths.push(`/src/pages/${base}`);
    }
    return paths;
  }

  // Network-first for HTML documents to avoid stale pages during development,
  // fallback to cache for offline capability.
  if (event.request.destination === 'document') {
    event.respondWith((async () => {
      try {
        const noStore = new Request(event.request, { cache: 'no-store' });
        const netResp = await fetch(noStore);
        if (isCacheableResponse(netResp)) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, netResp.clone()).catch(() => {});
        }
        return netResp;
      } catch (e) {
        // Offline: try alias then cached index
        const aliasList = getAliasPaths(url);
        for (const alias of aliasList) {
          const aliasResp = await caches.match(alias);
          if (aliasResp) return aliasResp;
        }
        return (await caches.match(event.request)) || (await caches.match('/index.html'));
      }
    })());
    return;
  }

  // Default cache-first for non-HTML
  event.respondWith(
    caches.match(event.request)
      .then(async response => {
        if (response) return response;

        const aliasList = getAliasPaths(url);
        for (const alias of aliasList) {
          const aliasResp = await caches.match(alias);
          if (aliasResp) return aliasResp;
        }

        const fetchRequest = event.request.clone();
        return fetch(fetchRequest).then(response => {
          if (!isCacheableResponse(response)) return response;
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            if (url.protocol === 'http:' || url.protocol === 'https:') {
              cache.put(event.request, responseToCache).catch(() => {});
            }
          });
          return response;
        });
      })
  );
});

// ===== Helpers =====
function isCacheableResponse(response) {
  if (!response) return false;
  if (response.status === 200) return true;
  // Allow opaque (no-cors) for CDN resources
  if (response.type === 'opaque') return true;
  // CORS-ok responses
  if (response.type === 'cors' && response.ok) return true;
  return false;
}

async function trimCache(cacheName, maxEntries) {
  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length > maxEntries) {
      await cache.delete(keys[0]);
      return trimCache(cacheName, maxEntries);
    }
  } catch (e) {
    // ignore
  }
}

// Stale-While-Revalidate for images with optional WebP upgrade (same-origin only)
const MISSING_WEBP = new Set();
async function handleImageRequest(event) {
  const request = event.request;
  const cache = await caches.open(RUNTIME_IMG_CACHE);
  const cached = await cache.match(request);

  const accept = request.headers.get('accept') || '';
  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isPngJpg = /\.(png|jpg|jpeg)$/i.test(url.pathname);
  const canTryWebp = isSameOrigin && isPngJpg && accept.includes('image/webp');

  const tryFetchWebp = async () => {
    if (!canTryWebp) return undefined;
    const webpPath = url.pathname.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    if (MISSING_WEBP.has(webpPath)) return undefined;
    try {
      const webpReq = new Request(webpPath, { headers: request.headers, mode: 'same-origin' });
      const webpResp = await fetch(webpReq);
      const ct = (webpResp.headers.get('content-type') || '').toLowerCase();
      if (isCacheableResponse(webpResp) && ct.includes('image/webp')) {
        // Store under original request key for transparency
        cache.put(request, webpResp.clone());
        trimCache(RUNTIME_IMG_CACHE, 80);
        return webpResp;
      }
    } catch (e) {
      // fallthrough
    }
    MISSING_WEBP.add(webpPath);
    return undefined;
  };

  const fetchOriginal = fetch(request).then(resp => {
    if (isCacheableResponse(resp)) {
      cache.put(request, resp.clone());
      trimCache(RUNTIME_IMG_CACHE, 80);
    }
    return resp;
  }).catch(() => cached);

  if (cached) {
    // Refresh in background
    event.waitUntil((async () => {
      const upgraded = await tryFetchWebp();
      if (!upgraded) await fetchOriginal;
    })());
    return cached;
  }

  const upgraded = await tryFetchWebp();
  if (upgraded) return upgraded;
  return fetchOriginal;
}

// CacheFirst for fonts
async function handleFontRequest(request) {
  const cache = await caches.open(RUNTIME_FONT_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  const resp = await fetch(request).catch(() => undefined);
  if (isCacheableResponse(resp)) {
    cache.put(request, resp.clone());
    trimCache(RUNTIME_FONT_CACHE, 30);
  }
  return resp || new Response('', { status: 504, statusText: 'Font unavailable' });
}

// Stale-While-Revalidate for CSS
async function handleStyleRequest(request) {
  const cache = await caches.open(RUNTIME_CSS_CACHE);
  const cached = await cache.match(request);
  const fetchAndUpdate = fetch(request).then(resp => {
    if (isCacheableResponse(resp)) {
      cache.put(request, resp.clone());
      trimCache(RUNTIME_CSS_CACHE, 40);
    }
    return resp;
  }).catch(() => cached);
  return cached || fetchAndUpdate;
}

// SWR for JSON (static demo data)
async function handleJsonRequest(request) {
  const cache = await caches.open(RUNTIME_JSON_CACHE);
  const cached = await cache.match(request);
  const fetchAndUpdate = fetch(request, { cache: 'no-store' }).then(resp => {
    if (isCacheableResponse(resp)) {
      cache.put(request, resp.clone());
      trimCache(RUNTIME_JSON_CACHE, 30);
    }
    return resp;
  }).catch(() => cached);
  return cached || fetchAndUpdate;
}

// Handle push notifications (optional)
self.addEventListener('push', event => {
  const options = {
    body: 'Bạn có thông báo mới từ eTax Mobile',
    icon: '/assets/logo.png',
    badge: '/assets/logo.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Xem ngay',
        icon: '/assets/icon-bell.png'
      },
      {
        action: 'close',
        title: 'Đóng',
        icon: '/assets/icon-bell.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('eTax Mobile', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/thongbao.html')
    );
  }
});
