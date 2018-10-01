const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser');

const mongoURL = 'mongodb://jhovahn:password1@ds247852.mlab.com:47852/notes';

const app = express();
const port = 5000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-headers', 'Content-Type, Accept');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/input', (req, res) => {
  MongoClient.connect(
    mongoURL,
    (err, client) => {
      if (err) throw err;
      const db = client.db('notes');
      db.collection('redux')
        .find()
        .sort({ created_at: 1 })
        .toArray((error, response) => {
          if (error) throw err;
          res.send(response);
        });
    },
  );
});

app.post('/input', (req, res) => {
  MongoClient.connect(
    mongoURL,
    (err, client) => {
      if (err) throw err;
      const db = client.db('notes');
      db.collection('redux')
        .insertOne(JSON.parse(req.body))
        .then(item => res.send(`${item} saved`))
        .catch(error => res.sendSatatus(400).send(`unable to save: ${error}`));
    },
  );
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
