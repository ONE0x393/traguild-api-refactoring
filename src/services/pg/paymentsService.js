const sequelize = require('../../config/database');
const logger = require('@src/config/winston/logger');

const secretKey = 'test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6';

exports.paymentsConfirm = async (paymentInfo = {}) => {
  const { paymentKey, orderId, amount } = paymentInfo;

  const encryptedSecretKey =
    'Basic ' + Buffer.from(secretKey + ':').toString('base64');

  const response = await fetch(
    'https://api.tosspayments.com/v1/payments/confirm',
    {
      method: 'POST',
      body: JSON.stringify({ orderId, amount, paymentKey }),
      headers: {
        Authorization: encryptedSecretKey,
        'Content-Type': 'application/json',
      },
    },
  );
  const data = await response.json();
  console.log(data);

  return data;
}