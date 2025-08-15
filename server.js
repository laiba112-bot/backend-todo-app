require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./src/routes/auth');
const todoRoutes = require('./src/routes/todos');
const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => res.json({ status: 'OK', service: 'API' }));

// Routes
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

// Port
const PORT = process.env.PORT || 5000;

// ✅ Direct MongoDB URI (Atlas)
const MONGO_URI = 'mongodb+srv://laibaazeem608:HzXuJg69ypeRSk3E@cluster0.y2inwub.mongodb.net/todoapp?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 API listening on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
