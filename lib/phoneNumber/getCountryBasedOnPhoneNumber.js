const { parsePhoneNumberFromString } = require("libphonenumber-js");

// Fungsi untuk mendapatkan nama negara berdasarkan nomor telepon
function getCountryName(phoneNumber) {
  try {
    // Buat objek PhoneNumber dari nomor telepon yang diberikan
    const phoneNumberObj = parsePhoneNumberFromString(phoneNumber);

    // Dapatkan nama negara berdasarkan kode negara
    const countryName = phoneNumberObj.country;

    if (countryName) {
      return {
        status: true,
        name: countryName,
      };
    } else {
      return {
        status: false,
        name: null,
      };
    }
  } catch (error) {
    return {
      status: false,
      name: null,
      error,
    };
  }
}

module.exports = getCountryName;
