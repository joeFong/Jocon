var express = require('express');
var router = express.Router();
const request = require('request');

router.get('/', function(req, res, next) {

  let lotsOfData = `http://data.nba.net/10s/prod/v1/2018/players.json`

  request.get(lotsOfData, (error, response, data) => {
    const parsedData = JSON.parse(data);
    res.send(parsedData);

    let nbaDataArray = parsedData.league.standard;
    // console.log(parsedData.league.standard[0].firstName);
    nbaDataArray.forEach((player) => {
      console.log(player.firstName + ' ' + player.lastName + ' ' + player.personId);
    })
  })
});

module.exports = router;
