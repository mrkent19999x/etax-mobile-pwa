/**
 * eTax Mobile - Data Management System
 * Quản lý dữ liệu tập trung theo MST
 *
 * @author eTax Mobile Team
 * @version 1.0.0
 */

class DataManager {
  constructor() {
    this.userData = new Map();
    this.currentMST = null;
    this.initializeDefaultData();
  }

  /**
   * Khởi tạo dữ liệu mẫu mặc định để test đồng bộ
   */
  initializeDefaultData() {
    console.log('🔄 Initializing default data for testing...');

    // Dữ liệu mẫu cho các MST khác nhau
    const defaultData = {
      "0123456789": {
        // Thông tin cơ bản
        mst: "0123456789",
        fullName: "NGUYỄN VĂN A",
        address: "123 Đường ABC, Quận XYZ, TP.HCM",
        taxOffice: "Chi cục thuế Quận XYZ",
        phone: "0123456789",
        email: "nguyenvana@example.com",

        // Thông tin thuế
        taxInfo: {
          totalAmount: "3,750,000 VND",
          paidAmount: "0 VND",
          pendingAmount: "3,750,000 VND",
          items: [
            {
              id: "04057866369400001",
              decision: "1866/TB-CCT",
              date: "07/01/2025",
              office: "Đội Thuế thành phố Hạ Long",
              chapter: "757",
              period: "00/06/2025",
              type: "Thuế giá trị gia tăng hàng sản xuất, kinh doanh trong nước (gồm cả dịch vụ trong lĩnh vực dầu khí) (1701)",
              region: "Thành phố Hạ Long (193HH)",
              dueDate: "30/06/2025",
              amount: "2,500,000 VND",
              paid: "0 VND",
              status: "Còn phải nộp",
              reference: "11020250031907891"
            },
            {
              id: "04057866369400002",
              decision: "1867/TB-CCT",
              date: "07/01/2025",
              office: "Đội Thuế thành phố Hạ Long",
              chapter: "757",
              period: "00/06/2025",
              type: "Thuế thu nhập từ hoạt động sản xuất, kinh doanh của cá nhân (1003)",
              region: "Thành phố Hạ Long (193HH)",
              dueDate: "30/06/2025",
              amount: "1,250,000 VND",
              paid: "0 VND",
              status: "Còn phải nộp",
              reference: "11020250031907892"
            }
          ]
        }
      },

      "8198700370": {
        // Thông tin cơ bản
        mst: "8198700370",
        fullName: "TRẦN THÀNH PHÚC",
        address: "456 Đường DEF, Quận GHI, TP.HCM",
        taxOffice: "Chi cục thuế Quận GHI",
        phone: "0987654321",
        email: "tranthanhphuc@example.com",

        // Thông tin thuế
        taxInfo: {
          totalAmount: "5,000,000 VND",
          paidAmount: "1,000,000 VND",
          pendingAmount: "4,000,000 VND",
          items: [
            {
              id: "04057866369400003",
              decision: "1868/TB-CCT",
              date: "08/01/2025",
              office: "Đội Thuế Quận GHI",
              chapter: "758",
              period: "00/07/2025",
              type: "Thuế thu nhập doanh nghiệp (1001)",
              region: "Quận GHI (194HH)",
              dueDate: "31/07/2025",
              amount: "3,000,000 VND",
              paid: "1,000,000 VND",
              status: "Đang nộp",
              reference: "11020250031907893"
            },
            {
              id: "04057866369400004",
              decision: "1869/TB-CCT",
              date: "08/01/2025",
              office: "Đội Thuế Quận GHI",
              chapter: "758",
              period: "00/07/2025",
              type: "Thuế giá trị gia tăng (1701)",
              region: "Quận GHI (194HH)",
              dueDate: "31/07/2025",
              amount: "2,000,000 VND",
              paid: "0 VND",
              status: "Còn phải nộp",
              reference: "11020250031907894"
            }
          ]
        }
      },

      "001095000163": {
        // Thông tin cơ bản
        mst: "001095000163",
        fullName: "NGUYỄN TRUNG NGHĨA",
        address: "789 Đường KLM, Quận NOP, TP.HCM",
        taxOffice: "Chi cục thuế Quận NOP",
        phone: "0369852147",
        email: "nguyentrungnghia@example.com",

        // Thông tin thuế
        taxInfo: {
          totalAmount: "1,800,000 VND",
          paidAmount: "800,000 VND",
          pendingAmount: "1,000,000 VND",
          items: [
            {
              id: "04057866369400005",
              decision: "1870/TB-CCT",
              date: "09/01/2025",
              office: "Đội Thuế Quận NOP",
              chapter: "759",
              period: "00/08/2025",
              type: "Thuế môn bài (1702)",
              region: "Quận NOP (195HH)",
              dueDate: "31/08/2025",
              amount: "1,000,000 VND",
              paid: "800,000 VND",
              status: "Đang nộp",
              reference: "11020250031907895"
            },
            {
              id: "04057866369400006",
              decision: "1871/TB-CCT",
              date: "09/01/2025",
              office: "Đội Thuế Quận NOP",
              chapter: "759",
              period: "00/08/2025",
              type: "Thuế tài nguyên (1703)",
              region: "Quận NOP (195HH)",
              dueDate: "31/08/2025",
              amount: "800,000 VND",
              paid: "0 VND",
              status: "Còn phải nộp",
              reference: "11020250031907896"
            }
          ]
        }
      }
    };

    // Lưu vào Map để truy cập nhanh
    Object.keys(defaultData).forEach(mst => {
      this.userData.set(mst, defaultData[mst]);
    });
  }

  /**
   * Lấy dữ liệu người dùng theo MST
   * @param {string} mst - Mã số thuế
   * @returns {object|null} Dữ liệu người dùng hoặc null nếu không tìm thấy
   */
  getUserData(mst) {
    if (!mst) return null;

    // Tìm chính xác MST
    if (this.userData.has(mst)) {
      return this.userData.get(mst);
    }

    // Tìm MST gần đúng (fallback)
    for (let [key, data] of this.userData) {
      if (key.includes(mst) || mst.includes(key)) {
        return data;
      }
    }

    return null;
  }

  /**
   * Lấy thông tin cơ bản của người dùng
   * @param {string} mst - Mã số thuế
   * @returns {object} Thông tin cơ bản
   */
  getBasicUserInfo(mst) {
    const userData = this.getUserData(mst);
    if (!userData) return null;

    return {
      mst: userData.mst,
      fullName: userData.fullName,
      address: userData.address,
      taxOffice: userData.taxOffice,
      phone: userData.phone,
      email: userData.email
    };
  }

  /**
   * Lấy thông tin thuế của người dùng
   * @param {string} mst - Mã số thuế
   * @returns {object} Thông tin thuế
   */
  getTaxInfo(mst) {
    const userData = this.getUserData(mst);
    if (!userData || !userData.taxInfo) return null;

    return userData.taxInfo;
  }

  /**
   * Lấy chi tiết thuế theo ID
   * @param {string} mst - Mã số thuế
   * @param {string} itemId - ID khoản thuế
   * @returns {object|null} Chi tiết thuế hoặc null
   */
  getTaxDetail(mst, itemId) {
    const taxInfo = this.getTaxInfo(mst);
    if (!taxInfo || !taxInfo.items) return null;

    return taxInfo.items.find(item => item.id === itemId) || null;
  }

  /**
   * Cập nhật dữ liệu người dùng
   * @param {string} mst - Mã số thuế
   * @param {object} newData - Dữ liệu mới
   */
  updateUserData(mst, newData) {
    if (this.userData.has(mst)) {
      const currentData = this.userData.get(mst);
      const updatedData = { ...currentData, ...newData };
      this.userData.set(mst, updatedData);

      // Lưu vào localStorage để đồng bộ
      localStorage.setItem(`etax_user_data_${mst}`, JSON.stringify(updatedData));
    }
  }

  /**
   * Đồng bộ dữ liệu từ localStorage
   */
  syncFromLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('etax_user_data_')) {
        const mst = key.replace('etax_user_data_', '');
        const data = JSON.parse(localStorage.getItem(key));
        this.userData.set(mst, data);
      }
    }
  }

  /**
   * Lưu dữ liệu vào localStorage
   * @param {string} mst - Mã số thuế
   */
  saveToLocalStorage(mst) {
    const userData = this.getUserData(mst);
    if (userData) {
      localStorage.setItem(`etax_user_data_${mst}`, JSON.stringify(userData));
    }
  }

  /**
   * Lấy danh sách tất cả MST có dữ liệu
   * @returns {string[]} Danh sách MST
   */
  getAllMSTs() {
    return Array.from(this.userData.keys());
  }

  /**
   * Kiểm tra MST có tồn tại không
   * @param {string} mst - Mã số thuế
   * @returns {boolean} True nếu tồn tại
   */
  hasMST(mst) {
    return this.userData.has(mst);
  }
}

// Tạo instance toàn cục
window.dataManager = new DataManager();

// Đồng bộ dữ liệu từ localStorage khi trang load
document.addEventListener('DOMContentLoaded', function() {
  window.dataManager.syncFromLocalStorage();
});

console.log('✅ Data Manager initialized with', window.dataManager.getAllMSTs().length, 'MST records');
