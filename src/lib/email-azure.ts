import nodemailer from "nodemailer";

// Create a transporter using Azure SMTP relay configuration
const transporter = nodemailer.createTransport({
  host: "smtp.office365.com", // Azure SMTP host (e.g., Office 365)
  port: 587, // Port for TLS (use 25 if not using TLS)
  secure: false, // Set to true if using port 465, otherwise false
  auth: {
    user: process.env.AZURE_EMAIL_USER, // Azure email address (Office 365 account)
    pass: process.env.AZURE_EMAIL_PASS, // Password or App Password for the email account
  },
  tls: {
    ciphers: "SSLv3", // Optional: Ensures compatibility with older ciphers
  },
});

// Function to send an email
export async function sendEmail(
  to: string | string[], 
  subject: string, 
  html: string, 
  attachments?: any[]
) {
  const mailOptions = {
    from: "info@copora.com", // Ensure this matches your verified domain in Azure
    to,
    subject,
    html,
    attachments, // optional attachments, if provided
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to} successfully`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

