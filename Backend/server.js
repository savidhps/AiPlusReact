const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const { trainFromCSV, loadSavedClassifier } = require('./classifier');

const app = express();
app.use(cors());

// Health check route first
app.get('/', (req, res) => {
  res.send('Feedback API running');
});

// Parse JSON for API routes only
app.use(express.json({ strict: false }));

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/feedback_db';
connectDB(MONGO_URI);

// Try to load saved classifier first, otherwise train
const savedPath = path.join(__dirname, 'classifier.json');
loadSavedClassifier(savedPath)
  .then(found => {
    if (found) {
      console.log('Loaded classifier from disk');
    } else {
      const csvPath = path.join(__dirname, 'data', 'emotions.csv');
      trainFromCSV(csvPath)
        .then(() => console.log('trained classifier'))
        .catch(err => {
          console.error('train error', err);
        });
    }
  })
  .catch(err => console.error('load classifier err', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/admin', require('./routes/admin'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server on', PORT));
