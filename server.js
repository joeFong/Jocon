const express = require('express');
const app = express();
const PORT = 3000;

var routesRouter = require('./routes/routes');
app.use('/', routesRouter);

var Jocon = require('./jocon');
var GoldenScore = require('./modules/GoldenScore');
const jocon = new Jocon('joemoney888', 'jpGOTjnb92$!');

const goldenscore = new GoldenScore(2019);


app.listen(`${PORT}`, () => {
  console.log(`listening on port ${PORT}`);
  // jocon.login();
  // goldenscore.calculateGoldenScore();
})