const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var Jocon = require('./jocon');

const app = express();
const PORT = 3000;

const routesRouter = require('./routes/routes');
const jocon = new Jocon('joemoney888', 'jpGOTjnb92$!');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', routesRouter);

mongoose
  .connect('mongodb+srv://joeco:ymucp2eg@jocon-ytlwt.mongodb.net/jocon?retryWrites=true&w=majority', {useNewUrlParser: true})
  .then(result => {
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
      // jocon.login();
    })
  })
  .catch((err) =>
    console.log(err)
  );
