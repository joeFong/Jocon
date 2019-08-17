const express = require('express');
const app = express();
const PORT = 3000;

const request = require('request');
var Jocon = require('./jocon');
const jocon = new Jocon('joemoney888', 'jpGOTjnb92$!');

app.get('/', (req, res, next) => {
  
  request.get('https://www.balldontlie.io/api/v1/players/237', (error, response, data) => {
    const parsedData = JSON.parse(data);
    console.log(parsedData);
    res.send(parsedData);
  })
})

app.listen(`${PORT}`, () => {
  console.log(`listening on port ${PORT}`);
  // jocon.login();
})