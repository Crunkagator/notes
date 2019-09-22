const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
app.use(morgan('dev'));
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, console.log('starting server on port 3000...done'));

app.post('/api/savenotes', (req, res) => {
  const notes = JSON.stringify(req.body, null, 2);
  fs.writeFile('notes.json', notes, err => {
    if (err) res.send(err);
  });
  res.send('notes saved');
});

app.post('/api/savetagpool', (req, res) => {
  const tags = JSON.stringify(req.body, null, 2);
  fs.writeFile('tagpool.json', tags, err => {
    if (err) res.send(err);
  });
  res.send('tags saved');
});

app.get('/api/getnotes', (req, res) => {
  const notes = fs.readFileSync('notes.json');
  res.send(JSON.parse(notes));
});

app.get('/api/gettags', (req, res) => {
  const tags = fs.readFileSync('tagpool.json');
  res.send(JSON.parse(tags));
});

app.get('/', (req, res) => {
  res.end('KNEEL, PEASANT! *leoricface*');
});
