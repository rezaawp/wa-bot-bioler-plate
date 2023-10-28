const { findPhoneNumbersInText } = require("libphonenumber-js");

module.exports = (from) => findPhoneNumbersInText("+" + from)[0].number.country;
