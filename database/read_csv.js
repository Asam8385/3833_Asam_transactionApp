const csv = require('csv-parser');
const path = require('path');
const fs = require('fs')

const csvFilePath = path.resolve(__dirname, 'transactions.csv');

function getTransactions(username, date1, date2) {
  const transactions = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        const transactionDate = new Date(row.date_of_transaction);

        // Check if the row matches the criteria
        if (
          row.user_email === username &&
          transactionDate >= new Date(date1) &&
          transactionDate <= new Date(date2)
        ) {
          transactions.push(row);
        }
      })
      .on('end', () => {
        resolve(JSON.stringify(transactions));
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}


  module.exports = getTransactions;
