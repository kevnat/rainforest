require('dotenv').config();

const paymentConfig = {
  publicKey: process.env.PAYMENT_PUBLIC_KEY,
  privateKey: process.env.PAYMENT_PRIVATE_KEY,
  apiVersion: process.env.PAYMENT_API_VERSION || 'v1',
  environment: process.env.NODE_ENV || 'development'
};

module.exports = paymentConfig;