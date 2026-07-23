/* ---------------------------------------------------------------------------------------
mailSender.ts
This utility connects to the SMTP server (Gmail) and sends the email.
------------------------------------------------------------------------------------------ */
import nodemailer from "nodemailer";
import type { SentMessageInfo } from "nodemailer";

const mailSender = async (
  email: string,
  subject: string,
  body: string
): Promise<SentMessageInfo> => {
  try {
    // Creating a Transporter (The Bridge)
    // This connects our Node server to the Gmail server
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // the name of the server
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Send this email to the user
    let info: SentMessageInfo = await transporter.sendMail({
      from: `EduFlow - Learning Management System: <${process.env.MAIL_USER}>`,
      to: email,
      subject: subject,
      html: body,
    });

    console.log("Mail Sender: Email sent successfully:", info.messageId);
    return info;
  } catch (error: unknown) {
    error instanceof Error
      ? console.log("Error inside mailSender utility:", error.message)
      : console.log("Error inside mailSender utility:", error);

    throw error; // Let the caller know it failed
  }
};

export default mailSender;
