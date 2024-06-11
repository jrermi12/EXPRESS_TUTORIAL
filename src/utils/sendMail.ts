import nodemailer from "nodemailer";
import ejs from "ejs";
import { validateEnv } from "../config/env.config"
interface MailOptions {
  email: string | string[];
  subject: string;
  template: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}

export const sendMail = async (options: MailOptions): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      host: validateEnv().smtp.host,
      port: validateEnv().smtp.port,
      service: validateEnv().smtp.service,
      secure: true,
      auth: {
        user: validateEnv().smtp.mail ,
        pass: validateEnv().smtp.password,
      },
    });

    // Verify the connection to the SMTP server
    await transporter.verify();
    const { email, subject, template, data } = options;
    const paths=`./src/mails/${template}`
    console.log({ paths });

    // Render the EJS template
    const html = await ejs.renderFile(paths, data);

    const mailOption = {
      from: validateEnv().smtp.mail,
      to: email,
      subject,
      html,
    };
    // Send the email
    const info = await transporter.sendMail(mailOption);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};