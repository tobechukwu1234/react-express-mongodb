import { mailtrapClient, sender } from "./email.config.js";
import { SEND_VERIFICATION_EMAIL, SEND_SUCCESSFUL_VERIFICATION_EMAIL } from "./email.template.js";

export const sendVerifyEmail = async (recipient, code) => {
 
  try {
    const recipients = [
      {
        email: recipient,
      }

    ];

    mailtrapClient.send({
        from: sender,
        to: recipients,
        subject: "Verify your Email",
        html: SEND_VERIFICATION_EMAIL.replace("{verficationToken}", code),
        category: "Email verification",
      })
      .then(console.log, console.error);

  } catch (error) {
    throw error;
  }
}

export const sendVerificationSuccessfulEmail = async (recipient) => {
 
  try {
    const recipients = [
      {
        email: recipient,
      }

    ];

    mailtrapClient.send({
        from: sender,
        to: recipients,
        subject: "Email verification successful",
        html: SEND_SUCCESSFUL_VERIFICATION_EMAIL,
        category: "Successful Verification Email",
      })
      .then(console.log, console.error);

  } catch (error) {
    throw error;
  }
}