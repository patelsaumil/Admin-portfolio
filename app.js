require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cors = require('cors');
const path = require('path');

const adminRoutes = require('./routes/admin');
const apiRoutes = require('./routes/api');

const app = express();

// --- DB ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(' MongoDB connected'))
  .catch(err => console.error(' MongoDB error:', err));

// --- Static & Views ---
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// --- Body & method override ---
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// --- CORS for React front-end ---
app.use(cors());

// --- Routes ---
app.use('/', adminRoutes);   
app.use('/api', apiRoutes);    

// --- Start ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
