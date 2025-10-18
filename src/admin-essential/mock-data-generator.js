/**
 * Mock Data Generator for eTax Mobile PWA
 * Quản lý mock users và dữ liệu test cho hệ thống
 */

// Default mock users data
const DEFAULT_MOCK_USERS = {
    "8198700370": {
        password: "123456",
        fullName: "Trần Thành Phúc",
        businessType: "individual",
        address: "123 Đường ABC, Quận 1, TP.HCM",
        email: "phuc.tran@example.com",
        phone: "0901234567"
    },
    "001095000163": {
        password: "123456",
        fullName: "Công ty TNHH ABC",
        businessType: "company",
        address: "456 Đường XYZ, Quận 2, TP.HCM",
        email: "info@abc.com",
        phone: "0281234567"
    },
    "111111": {
        password: "xxx",
        fullName: "Test User",
        businessType: "individual",
        address: "Test Address",
        email: "test@example.com",
        phone: "0123456789"
    },
    "123456789": {
        password: "password",
        fullName: "Nguyễn Văn A",
        businessType: "household",
        address: "789 Đường DEF, Quận 3, TP.HCM",
        email: "nguyenvana@example.com",
        phone: "0987654321"
    }
};

/**
 * Generate a new mock user
 * @param {string} mst - Mã số thuế
 * @param {string} password - Mật khẩu
 * @param {Object} options - Các tùy chọn khác
 * @returns {Object} User object
 */
function generateMockUser(mst, password, options = {}) {
    const defaultOptions = {
        fullName: "Mock User",
        businessType: "individual",
        address: "",
        email: "",
        phone: ""
    };
    
    return {
        mst,
        password,
        ...defaultOptions,
        ...options
    };
}

/**
 * Save mock users to localStorage
 * @param {Object} users - Users object
 */
function saveMockUsers(users) {
    try {
        localStorage.setItem('etax_mock_users', JSON.stringify(users));
        console.log('Mock users saved successfully');
    } catch (error) {
        console.error('Error saving mock users:', error);
    }
}

/**
 * Load mock users from localStorage
 * @returns {Object} Users object
 */
function loadMockUsers() {
    try {
        const users = localStorage.getItem('etax_mock_users');
        if (users) {
            return JSON.parse(users);
        }
        return {};
    } catch (error) {
        console.error('Error loading mock users:', error);
        return {};
    }
}

/**
 * Get default mock users
 * @returns {Object} Default users object
 */
function getDefaultMockUsers() {
    return DEFAULT_MOCK_USERS;
}

/**
 * Validate user credentials
 * @param {string} mst - Mã số thuế
 * @param {string} password - Mật khẩu
 * @returns {Object|null} User object if valid, null if invalid
 */
function validateUserCredentials(mst, password) {
    const users = loadMockUsers();
    const user = users[mst];
    
    if (user && user.password === password) {
        return user;
    }
    
    // Fallback to default users if no custom users exist
    const defaultUsers = getDefaultMockUsers();
    const defaultUser = defaultUsers[mst];
    
    if (defaultUser && defaultUser.password === password) {
        return defaultUser;
    }
    
    return null;
}

/**
 * Get user by MST
 * @param {string} mst - Mã số thuế
 * @returns {Object|null} User object or null
 */
function getUserByMST(mst) {
    const users = loadMockUsers();
    if (users[mst]) {
        return users[mst];
    }
    
    // Fallback to default users
    const defaultUsers = getDefaultMockUsers();
    return defaultUsers[mst] || null;
}

/**
 * Create user session
 * @param {string} mst - Mã số thuế
 * @param {Object} userData - User data
 */
function createUserSession(mst, userData) {
    try {
        localStorage.setItem('etax_logged_in_user', mst);
        localStorage.setItem('etax_user_info', JSON.stringify(userData));
        console.log('User session created for:', mst);
    } catch (error) {
        console.error('Error creating user session:', error);
    }
}

/**
 * Clear user session
 */
function clearUserSession() {
    try {
        localStorage.removeItem('etax_logged_in_user');
        localStorage.removeItem('etax_user_info');
        console.log('User session cleared');
    } catch (error) {
        console.error('Error clearing user session:', error);
    }
}

/**
 * Get current logged in user
 * @returns {Object|null} Current user or null
 */
function getCurrentUser() {
    try {
        const mst = localStorage.getItem('etax_logged_in_user');
        const userInfo = localStorage.getItem('etax_user_info');
        
        if (mst && userInfo) {
            return {
                mst,
                ...JSON.parse(userInfo)
            };
        }
        
        return null;
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
}

/**
 * Initialize default data if not exists
 */
function initializeDefaultData() {
    const users = loadMockUsers();
    if (Object.keys(users).length === 0) {
        console.log('No mock users found, initializing with default data...');
        saveMockUsers(getDefaultMockUsers());
    }
}

// Auto-initialize when script loads
document.addEventListener('DOMContentLoaded', function() {
    initializeDefaultData();
});

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateMockUser,
        saveMockUsers,
        loadMockUsers,
        getDefaultMockUsers,
        validateUserCredentials,
        getUserByMST,
        createUserSession,
        clearUserSession,
        getCurrentUser,
        initializeDefaultData
    };
}
