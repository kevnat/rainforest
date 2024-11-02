const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Rainforest Client API Documentation',
      version: '1.0.0',
      description: 'API documentation for Rainforest Client',
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js', './index.js'], // files containing annotations
};

module.exports = swaggerJsdoc(options); 