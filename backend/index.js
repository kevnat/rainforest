const express = require('express');
const cors = require('cors');

const sequelize = require('./database');
// const userRoutes = require('./routes/userRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const app = express();
const PORT = process.env.PORT || 4000;

//Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-frontend-domain.com' 
    : 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Database sync
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully!');
  })
  .catch(error => {
    console.error('Error syncing database:', error);
  });

// Simple API route to test Sequelize
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();  // Fetch all users
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/api', (req, res) => {
  res.send('Hello from Express!');
});

// Enhanced CORS configuration for FlutterFlow
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  app.use(express.json());


  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
  });