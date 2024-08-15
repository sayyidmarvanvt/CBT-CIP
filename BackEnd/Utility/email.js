import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

// export const sendEmail = async (req, res) => {
//   const { email, subject, message } = req.body;
//   console.log(message);
//   try {
//     await transporter.sendMail({
//       from: process.env.SMTP_MAIL,
//       to: email,
//       subject,
//       text: message,
//     });
//     res.status(200).json("email sent succefully");
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };

export const sendInvitationEmail = async (email, eventName, eventDate,guestId) => {

  const rsvpLink = `http://localhost:5173/guests/rsvp/${guestId}`;
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: `Invitation to ${eventName}`,
    text: `You are invited to ${eventName} on ${eventDate}.Please RSVP using the following link: ${rsvpLink}.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Invitation email sent");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const sendForgotPassword = async (email, token) => {
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "Reset Password",
    html: `<p>You are receiving this email because you (or someone else) have requested to reset the password for your account.</p>
           <p><strong>Please use the following token to reset your password:</strong></p>
           <p style="font-family: monospace; font-size: 15px; font-weight: bold; background-color: #f1f1f1; padding: 10px; border-radius: 4px;">${token}</p>
           <p>Copy and paste this token into the password reset form on our website.</p>
           <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Reset password email sent");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};



