// Utility functions for string validation
const EMAIL_OR_PHONE_REGEX =
  /^(?:\+965|965)?(\d{8})$|^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export default {
  isBlank: (text: string): boolean => {
    return !text || text.trim().length === 0;
  },

  isValidEmail: (email: string): boolean => {
    const nameRegex = new RegExp(EMAIL_OR_PHONE_REGEX);
    return nameRegex.test(email);
  },

  isValidPhone: (phone: string): boolean => {
    return phone.length === 10;
  },

  isValidPassword: (password: string): boolean => {
    return password.length >= 6;
  },

  isPasswordMatch: (password: string, conPassword: string): boolean => {
    return password === conPassword;
  },

  getValidPrice: (text: string) => {
    const formattedText = text.replace(/[^0-9.]/g, '');
    // if (formattedText.match(/^\d*\.?\d{0,2}$/)) {
    return formattedText;
    // }
  },

  getNumberText: (text: string) => {
    return text.replace(/[^0-9]/g, '');
  },
};
