
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cors = require('cors');
const path = require('path');

// Routes
const adminRoutes = require('./routes/admin');
const apiRoutes = require('./routes/api');

const app = express();


app.use(express.static(path.join(__dirname, 'public')));   
app.use(express.urlencoded({ extended: true }));           
app.use(express.json());                                  
app.use(methodOverride('_method'));                        
app.use(cors());                                          

/* ---------- Views ---------- */
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


app.get('/healthz', (_req, res) => res.status(200).send('ok'));


mongoose.set('bufferCommands', false);
mongoose.set('strictQuery', true);

const { MONGODB_URI, PORT = 3000 } = process.env;

async function start() {
  if (!MONGODB_URI) {
    console.error('Missing MONGODB_URI. Add it to your .env (local) and Render → Environment.');
    process.exit(1);
  }

  try {
    console.log(' Connecting to MongoDB…');
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, 
      socketTimeoutMS: 45000,
      retryWrites: true,
    });
    console.log(' MongoDB connected');

   
    app.use('/', adminRoutes);   
    app.use('/api', apiRoutes);  

    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(' MongoDB connection error:', err.message);
    process.exit(1);
  }
}

start();

process.on('unhandledRejection', (reason) => {
  console.error('UNHANDLED REJECTION:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
  process.exit(1);
});
