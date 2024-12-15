const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Create transporter using SMTP (use your email service details)
const transporter = nodemailer.createTransport({
  service: 'gmail', // or other SMTP service
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

// Function to generate OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
};

// Send OTP to email
const sendOTP = (email) => {
  const otp = generateOTP();

  // Store OTP in the database with a 5-minute expiration
  // In practice, save it in a database like MongoDB or Redis

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Your OTP for Email Verification',
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email: ', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
const verifyOTP = (inputOTP, storedOTP) => {
  if (inputOTP === storedOTP) {
    console.log('OTP Verified');
    // Proceed with login or registration
  } else {
    console.log('Invalid OTP');
  }
};

sendOTP('user@example.com');
