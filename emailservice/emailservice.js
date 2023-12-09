const nodemailer = require('nodemailer');



function sendEmail(userEmail, pdfBuffer) {
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    logger : true,
    debug : true, 
    secureConnection : false,
    auth: {
      user: `Healthhub.enugpro@gmail.com`, // Your Gmail email address
      pass: 'myzzvktyicgfulty', // Your Gmail password or App Password
    },
    tls :
    {
      rejectUnauthorized : true
    },
  });
  
  // Mail options
  const mailOptions = {
    from: 'Healthhub.enugpro@gmail.com', // Sender email address
    to: userEmail, // Recipient email address 
    subject: 'Transaction Details',
    text: 'Attached are your transaction details.',
    attachments: [
      {
        filename: 'TransactionDetails.pdf',
        content: pdfBuffer,
      },
    ],
  };
  
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error('Error sending email:', error);
    }
    console.log('Email sent:', info.response);
  });


}

module.exports = sendEmail;