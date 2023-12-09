const express = require('express');
const getTransactions = require('../database/read_csv')
const generatePDF = require('../pdf-generation/pdfgen')
const sendEmail = require('../emailservice/emailservice.js')
const csv = require('csv-parser');
const app = express();


app.use(express.json());

app.post('/gettransactions', async (req, res) => {
    const { user_email, date1, date2 } = req.body;
  
    try {
      // Step 1: Get transactions
      const transactions = await getTransactions(user_email, date1, date2);
  
      // Step 2: Generate PDF
      const pdfBuffer = await generatePDF(transactions);
  
      // Step 3: Send email
      await sendEmail(user_email, pdfBuffer);
  
      // Success message
      console.log('Transaction details sent successfully!');
  
      // Respond to the client
      res.status(200).json({ message: 'Transaction details sent successfully!' });
    } catch (error) {
      console.error('Error processing transaction and sending email:', error);
  
      // Respond with an error to the client
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = app;