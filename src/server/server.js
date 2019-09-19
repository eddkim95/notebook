const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const NoteController = require('./controllers/NoteController');

const app = express();

require('dotenv').config();

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/notes', NoteController.getNotes, (req, res) => {
  res.status(200).send(res.locals.found_notes)
});

app.post('/notes', NoteController.createNote, (req, res) => {
  res.status(200).send(res.locals.new_note)
});

app.delete('/notes', NoteController.deleteNote, (req, res) => {
  res.end();
});

app.patch('/notes', NoteController.updateNote, (req, res) => {
  res.end();
})

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (err) => {
  if (err) console.log(err);
  else console.log('Connected to database...');
});

app.listen(8080, (err) => {
  if (err) console.log(err);
  else console.log('Listening on port 8080...');
});