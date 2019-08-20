var express = require('express');
var router = express.Router();
const request = require('request');

router.get('/', function(req, res, next) {
  request.get("https://www.balldontlie.io/api/v1/players", (error, response, data) => {
    const parsedData = JSON.parse(data);
    res.send(parsedData);


    let allPlayers = parsedData.data;
    let metaData = parsedData.meta;
    
    allPlayers.forEach((player) => {
      console.log(player.team.city);
    })

  })
});

module.exports = router;
