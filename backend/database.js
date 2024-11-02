// backend/database.js

const { Sequelize } = require('sequelize');

// Create a Sequelize instance and pass in your database configuration
const sequelize = new Sequelize('sample_data', 'root', 'rubysone1!', {
  host: 'localhost',
  dialect: 'mysql', 
  logging: console.log,
});

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;