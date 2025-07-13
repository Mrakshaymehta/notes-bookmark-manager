const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// API routes
app.use('/api/notes', require('./routes/noteRoutes'));
app.use('/api/bookmarks', require('./routes/bookmarkRoutes'));

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));