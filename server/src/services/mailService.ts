import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { User } from "@prisma/client";

const MAIL_EMAIL = process.env.MAIL_EMAIL;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

const sendOTPMail = async (user: User, otp: string) => {
  let config = {
    service: "gmail",
    auth: {
      user: MAIL_EMAIL,
      pass: MAIL_PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });

  let response = {
    body: {
      name: user.username,
      intro: "OTP from EcoSync is " + otp,
      outro: "Your OTP is valid for 5 minutes\nBest Regards, Team EcoSync",
      // signature: 'Best regards, Team Sohoj Thikadari'
      signature: false,
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: MAIL_EMAIL,
    to: user.email,
    subject: "Forget Password OTP",
    html: mail,
  };

  await transporter.sendMail(message);
};

const sendMail = async (
  user: User,
  subject: string,
  introMessage: string,
  outroMessage: string
) => {
  let config = {
    service: "gmail",
    auth: {
      user: MAIL_EMAIL,
      pass: MAIL_PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });

  let response = {
    body: {
      name: user.username,
      intro: introMessage, // "OTP from EcoSync is " + otp,
      outro: outroMessage, // "Your OTP is valid for 5 minutes\nBest Regards, Team EcoSync",
      // signature: 'Best regards, Team Sohoj Thikadari'
      signature: false,
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: MAIL_EMAIL,
    to: user.email,
    subject: subject,
    html: mail,
  };

  await transporter.sendMail(message);
};

export { sendOTPMail, sendMail };
