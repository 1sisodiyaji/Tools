const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
 
router.post('/sendEmail', async (req, res) => {
  const { name, mobile, email, message } = req.body;
 console.log(req.body);
  if (!name || !mobile || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
 
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Define the email options
  let mailOptions = {
    from: email,  
    to: '637golusingh@gmail.com',  
    subject: 'New Contact Form Submission', 
    text: `
      You have a new contact form submission.
      
      Name: ${name}
      Mobile: ${mobile}
      Email: ${email}
      Message: ${message}
    `,  
  };

  try { 
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;
