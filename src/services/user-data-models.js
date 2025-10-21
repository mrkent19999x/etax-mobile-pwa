/**
 * eTax Mobile - User Data Models
 * Định nghĩa cấu trúc dữ liệu chuẩn cho hệ thống
 *
 * @author eTax Mobile Team
 * @version 1.0.0
 */

/**
 * Model thông tin cơ bản của người dùng
 */
class UserBasicInfo {
  constructor() {
    this.mst = "";
    this.fullName = "";
    this.address = "";
    this.taxOffice = "";
    this.phone = "";
    this.email = "";
  }

  /**
   * Tạo từ object
   * @param {object} data
   */
  static fromObject(data) {
    const instance = new UserBasicInfo();
    Object.assign(instance, data);
    return instance;
  }

  /**
   * Validate dữ liệu
   * @returns {boolean} True nếu hợp lệ
   */
  isValid() {
    return this.mst && this.fullName && this.mst.length >= 10;
  }
}

/**
 * Model thông tin thuế
 */
class TaxInfo {
  constructor() {
    this.totalAmount = "0 VND";
    this.paidAmount = "0 VND";
    this.pendingAmount = "0 VND";
    this.items = [];
  }

  /**
   * Tính tổng tiền từ các items
   */
  calculateTotals() {
    if (this.items.length === 0) {
      this.totalAmount = "0 VND";
      this.paidAmount = "0 VND";
      this.pendingAmount = "0 VND";
      return;
    }

    // Tính tổng từ các items
    const total = this.items.reduce((sum, item) => {
      return sum + this.parseAmount(item.amount);
    }, 0);

    const paid = this.items.reduce((sum, item) => {
      return sum + this.parseAmount(item.paid);
    }, 0);

    const pending = total - paid;

    this.totalAmount = this.formatAmount(total);
    this.paidAmount = this.formatAmount(paid);
    this.pendingAmount = this.formatAmount(pending);
  }

  /**
   * Parse số tiền từ string
   * @param {string} amountStr
   * @returns {number}
   */
  parseAmount(amountStr) {
    if (!amountStr) return 0;
    return parseInt(amountStr.replace(/[^\d]/g, '')) || 0;
  }

  /**
   * Format số tiền thành string
   * @param {number} amount
   * @returns {string}
   */
  formatAmount(amount) {
    return amount.toLocaleString('vi-VN') + ' VND';
  }

  /**
   * Tạo từ object
   * @param {object} data
   */
  static fromObject(data) {
    const instance = new TaxInfo();
    Object.assign(instance, data);
    instance.calculateTotals();
    return instance;
  }
}

/**
 * Model khoản thuế chi tiết
 */
class TaxItem {
  constructor() {
    this.id = "";
    this.decision = "";
    this.date = "";
    this.office = "";
    this.chapter = "";
    this.period = "";
    this.type = "";
    this.region = "";
    this.dueDate = "";
    this.amount = "0 VND";
    this.paid = "0 VND";
    this.status = "";
    this.reference = "";
  }

  /**
   * Tạo từ object
   * @param {object} data
   */
  static fromObject(data) {
    const instance = new TaxItem();
    Object.assign(instance, data);
    return instance;
  }

  /**
   * Validate dữ liệu
   * @returns {boolean}
   */
  isValid() {
    return this.id && this.amount && this.status;
  }
}

/**
 * Model dữ liệu đầy đủ của người dùng
 */
class UserData {
  constructor() {
    this.basicInfo = new UserBasicInfo();
    this.taxInfo = new TaxInfo();
    this.lastUpdated = new Date().toISOString();
  }

  /**
   * Tạo từ object
   * @param {object} data
   */
  static fromObject(data) {
    const instance = new UserData();

    if (data.basicInfo) {
      instance.basicInfo = UserBasicInfo.fromObject(data.basicInfo);
    }

    if (data.taxInfo) {
      instance.taxInfo = TaxInfo.fromObject(data.taxInfo);
    }

    if (data.lastUpdated) {
      instance.lastUpdated = data.lastUpdated;
    }

    return instance;
  }

  /**
   * Chuyển thành object để lưu trữ
   * @returns {object}
   */
  toObject() {
    return {
      mst: this.basicInfo.mst,
      fullName: this.basicInfo.fullName,
      address: this.basicInfo.address,
      taxOffice: this.basicInfo.taxOffice,
      phone: this.basicInfo.phone,
      email: this.basicInfo.email,
      taxInfo: {
        totalAmount: this.taxInfo.totalAmount,
        paidAmount: this.taxInfo.paidAmount,
        pendingAmount: this.taxInfo.pendingAmount,
        items: this.taxInfo.items.map(item => ({
          id: item.id,
          decision: item.decision,
          date: item.date,
          office: item.office,
          chapter: item.chapter,
          period: item.period,
          type: item.type,
          region: item.region,
          dueDate: item.dueDate,
          amount: item.amount,
          paid: item.paid,
          status: item.status,
          reference: item.reference
        }))
      },
      lastUpdated: this.lastUpdated
    };
  }

  /**
   * Validate toàn bộ dữ liệu
   * @returns {boolean}
   */
  isValid() {
    return this.basicInfo.isValid() && this.taxInfo.items.every(item => item.isValid());
  }
}

/**
 * Utility functions cho việc xử lý dữ liệu
 */
class DataUtils {
  /**
   * Format MST chuẩn
   * @param {string} mst
   * @returns {string}
   */
  static formatMST(mst) {
    if (!mst) return "";
    return mst.replace(/\D/g, '').substring(0, 13);
  }

  /**
   * Validate MST
   * @param {string} mst
   * @returns {boolean}
   */
  static isValidMST(mst) {
    const cleanMST = this.formatMST(mst);
    return cleanMST.length >= 10 && cleanMST.length <= 13;
  }

  /**
   * Format tên người dùng
   * @param {string} name
   * @returns {string}
   */
  static formatFullName(name) {
    if (!name) return "";
    return name.toUpperCase().trim();
  }

  /**
   * Tính tuổi từ ngày sinh
   * @param {string} birthDate - DD/MM/YYYY
   * @returns {number}
   */
  static calculateAge(birthDate) {
    if (!birthDate) return 0;
    const [day, month, year] = birthDate.split('/');
    const birth = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  }

  /**
   * Format số điện thoại
   * @param {string} phone
   * @returns {string}
   */
  static formatPhone(phone) {
    if (!phone) return "";
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('84')) {
      return cleaned;
    } else if (cleaned.startsWith('0')) {
      return '84' + cleaned.substring(1);
    }
    return cleaned;
  }
}

// Export các models để sử dụng
window.UserDataModels = {
  UserBasicInfo,
  TaxInfo,
  TaxItem,
  UserData,
  DataUtils
};

console.log('✅ User Data Models loaded');
