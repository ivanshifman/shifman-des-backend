import twilio from "twilio";
import { config } from "../config/config.js";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { getCodes } from "country-list";

class SmsService {
  constructor() {
    this.client = twilio(
      config.SMS.TWILIO_ACCOUNT_SID,
      config.SMS.TWILIO_AUTH_TOKEN
    );
    this.validCountryCodes = new Set(getCodes());
  }

  validateCountryCode(code) {
    return this.validCountryCodes.has(code.toUpperCase());
  }

  validatePhoneNumber(phone, countryCode) {
    const phoneNumber = parsePhoneNumberFromString(phone, countryCode);
    return phoneNumber && phoneNumber.isValid();
  }

  async sendSms(to, message, countryCode) {
    if (!this.validatePhoneNumber(to, countryCode)) {
      throw new Error("Invalid phone number");
    }

    const info = await this.client.messages.create({
      from: config.SMS.TWILIO_PHONE_NUMBER,
      to,
      body: message,
    });

    console.log(info);
  }

  async validateAndRegisterUser(user) {
    const { phone, countryCode } = user;

    if (!this.validateCountryCode(countryCode)) {
      throw new Error("Invalid country code");
    }

    if (!this.validatePhoneNumber(phone, countryCode)) {
      throw new Error("Invalid phone number");
    }

    return true;
  }
}

export const smsService = new SmsService();
