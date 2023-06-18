const examples = require("libphonenumber-js/mobile/examples");
// Impor library libphonenumber-js
const {
  default: PhoneNumber,
  getExampleNumber,
  findPhoneNumbersInText,
} = require("libphonenumber-js");

// Fungsi untuk memvalidasi nomor telepon
function validatePhoneNumber(phoneNumber, kodeNegara) {
  try {
    const negara = kodeNegara;
    // Buat objek PhoneNumber dari nomor telepon yang diberikan
    const phoneNumberObj = PhoneNumber.parse(phoneNumber, negara);
    const example = getExampleNumber(negara, examples);
    const countryCallingCode = example.countryCallingCode;

    // Periksa apakah nomor telepon valid
    if (PhoneNumber.isValidNumber(phoneNumberObj)) {
      return {
        err: null,
        phoneNumber: countryCallingCode + phoneNumberObj.phone,
      };
    } else {
      return {
        err: "phone number is invalid",
        phoneNumber: null,
      };
    }
  } catch (error) {
    return {
      err: error,
      phoneNumber: null,
    };
  }
}

// Contoh penggunaan

const getCountry = require("./lib/phoneNumber/getCountryBasedOnPhoneNumber");
const kodeNegara = getCountry("+6285714148247").name;
const phoneNumber = "62857-1414-8247"; // Ganti dengan nomor telepon yang ingin Anda validasi
const validationMessage = validatePhoneNumber(phoneNumber, kodeNegara);
console.log(validationMessage);
