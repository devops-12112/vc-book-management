const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for testing
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('dev'));

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      console.error('FATAL ERROR: MONGODB_URI is not defined.');
      process.exit(1);
    }
    console.log('Attempting to connect to MongoDB at:', mongoURI);
    
    mongoose.connection.on('connected', () => console.log('Mongoose: connected to DB'));
    mongoose.connection.on('error', (err) => console.error('Mongoose: connection error:', err));
    mongoose.connection.on('disconnected', () => console.log('Mongoose: disconnected'));
    mongoose.connection.on('reconnected', () => console.log('Mongoose: reconnected'));
    mongoose.connection.on('close', () => console.log('Mongoose: connection closed'));

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000,
    });
    
    // console.log('MongoDB Connected Successfully'); // Covered by 'connected' event
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    // Don't exit the process, just log the error
    console.error('Will retry connection...');
  }
};

// Connect to MongoDB with retry
const connectWithRetry = () => {
  connectDB().catch(err => {
    console.log('MongoDB connection unsuccessful, retry after 5 seconds...');
    setTimeout(connectWithRetry, 5000);
  });
};

connectWithRetry();

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
app.use('/api/books', require('./routes/books'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
}); 