import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendBookingEmail = async (to, subject, message) => {
  const email = {
    to,
    from: process.env.EMAIL_FROM,
    subject,
    text: message
  };

  await sgMail.send(email);
};
