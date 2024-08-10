import nodemailer from "nodemailer";
import { config } from "../config/config.js";
import { mailTemplates } from "../utils/mailTemplates.js";

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.MAILER.HOST,
      port: config.MAILER.PORT,
      auth: {
        user: config.MAILER.USERNAME,
        pass: config.MAILER.PASSWORD,
      },
    });
  }

  getMessageTemplate(type, mail) {
    const template = mailTemplates[type];
    if (!template) {
      throw new Error(`Template type ${type} is not defined`);
    }
    return template(mail);
  }

  async sendMail({ to, subject, type }) {
    const message = this.getMessageTemplate(type, to);

    await this.transporter.sendMail({
      from: config.MAILER.USERNAME,
      to,
      subject,
      html: message,
    });
  }
}

export const mailService = new MailService();
