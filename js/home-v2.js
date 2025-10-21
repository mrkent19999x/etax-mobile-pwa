document.addEventListener('DOMContentLoaded', () => {
    // Initialize Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyD_rJgBFgBulheVenQUE2KXr4PBpSpTCxw",
        authDomain: "etax-7fbf8.firebaseapp.com",
        databaseURL: "https://etax-7fbf8-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "etax-7fbf8",
    };
    firebase.initializeApp(firebaseConfig);
    const firestore = firebase.firestore();

    // Check login status
    const loggedInMST = localStorage.getItem('etax_logged_in_user');
    if (!loggedInMST) {
        window.location.href = '/login.html';
        return;
    }

    // --- Fetch and display user data ---
    async function fetchUserData() {
        const userDoc = await firestore.collection('users').doc(loggedInMST).get();

        if (userDoc.exists) {
            const userData = userDoc.data();
            updateUI(userData);
        } else {
            console.warn('User not found in Firestore, using local data if available.');
            const localData = JSON.parse(localStorage.getItem('etax_user_data'));
             if(localData) updateUI(localData);
        }
    }

    // --- Update UI elements with user data ---
    function updateUI(userData) {
        document.getElementById('user-mst').textContent = `MST: ${userData.mst}`;
        document.getElementById('user-name').textContent = userData.fullName;
        document.getElementById('sidebar-username').textContent = userData.fullName;
    }

    // --- Populate Quick Actions ---
    function populateQuickActions() {
        const container = document.querySelector('.quick-actions .scroll-container');
        const actions = [
            { name: 'Tra cứu NPT', icon: 'icon1.png', link: 'tracuttnpt.html' },
            { name: 'Hồ sơ ĐK thuế', icon: 'icon2.png', link: 'hsdkythue.html' },
            { name: 'Hồ sơ QTT', icon: 'icon3.png', link: 'ho-tro-qtthue.html' },
            { name: 'Tra cứu QTT', icon: 'icon4.png', link: '#' },
            { name: 'Tra cứu chứng từ', icon: 'icon4.png', link: 'tra-cuu-chung-tu.html' },
        ];

        actions.forEach(action => {
            const item = document.createElement('div');
            item.className = 'action-item';
            item.onclick = () => window.location.href = action.link;
            item.innerHTML = `
                <img src="/assets/quick-actions/${action.icon}" alt="${action.name}">
                <span>${action.name}</span>
            `;
            container.appendChild(item);
        });
    }

    // --- Populate Service Grid ---
    function populateServiceGrid() {
        const container = document.querySelector('.service-grid');
        const services = [
            { name: 'Hoá đơn điện tử', icon: 'index1.png', link: 'hoadondt.html' },
            { name: 'Khai thuế', icon: 'index2.png', link: 'khaithue.html' },
            { name: 'Đăng ký thuế', icon: 'index3.png', link: 'dangky.html' },
            { name: 'Hỗ trợ QTT', icon: 'index4.png', link: 'ho-tro-qtt.html' },
            { name: 'Nộp thuế', icon: 'index5.png', link: 'nopthue.html' },
            { name: 'Nghĩa vụ thuế', icon: 'index6.png', link: 'nghiavu.html' },
            { name: 'Thông báo', icon: 'index7.png', link: 'thongbao.html' },
            { name: 'Tiện ích', icon: 'index8.png', link: 'tienich.html' },
            { name: 'Hỗ trợ', icon: 'index9.png', link: 'hotro.html' },
            { name: 'Thiết lập', icon: 'index10.png', link: 'thietlap.html' },
        ];
        
        services.forEach(service => {
            const item = document.createElement('div');
            item.className = 'service-item';
            item.onclick = () => window.location.href = service.link;
            item.innerHTML = `
                <img src="/assets/services/${service.icon}" alt="${service.name}">
                <span>${service.name}</span>
            `;
            container.appendChild(item);
        });
    }

    // Initial calls
    fetchUserData();
    populateQuickActions();
    populateServiceGrid();
});
