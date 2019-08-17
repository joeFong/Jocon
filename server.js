const express = require('express');
const app = express();

var Jocon = require('./jocon');
const jocon = new Jocon('joemoney888', 'jpGOTjnb92$!');

const port = 3000;

app.get('/', (req, res, next) => {
  res.send('Jocon: Hello World');
})

app.listen(`${port}`, () => {
  console.log(`listening on port ${port}`);
  // jocon.login();
})