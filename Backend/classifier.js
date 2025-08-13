const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const natural = require('natural');

let classifier = new natural.BayesClassifier();
let isReady = false;

const trainFromCSV = (csvPath) => {
  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (data) => rows.push(data))
      .on('end', () => {
        try {
          rows.forEach(r => {
            // expect columns 'text' and 'Emotion' (case-insensitive)
            const text = r.text || r.Text || r.t || '';
            const label = r.Emotion || r.emotion || r.label || 'neutral';
            if (text && label) classifier.addDocument(text.toString(), label.toString());
          });
          classifier.train();
          isReady = true;
          // save classifier for faster startup next time (optional)
          const dumpPath = path.join(__dirname, 'classifier.json');
          classifier.save(dumpPath, (err) => {
            if (err) console.warn('classifier save failed', err);
            else console.log('Classifier trained and saved');
            resolve();
          });
        } catch (err) {
          reject(err);
        }
      })
      .on('error', reject);
  });
};

const loadSavedClassifier = (dumpPath) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(dumpPath)) return resolve(false);
    natural.BayesClassifier.load(dumpPath, null, (err, loaded) => {
      if (err) return reject(err);
      classifier = loaded;
      isReady = true;
      resolve(true);
    });
  });
};

const predict = (text) => {
  if (!isReady) return 'unknown';
  try {
    return classifier.classify(text);
  } catch (e) {
    return 'unknown';
  }
};

module.exports = { trainFromCSV, loadSavedClassifier, predict, isReady: () => isReady };
