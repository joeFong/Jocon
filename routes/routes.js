var express = require('express');
var router = express.Router();
// const request = require('request');
const axios = require('axios');


let activePlayerList = [];

  router.get('/', function(req, res, next) {
    axios.get('http://data.nba.net/10s/prod/v1/2018/players.json')
      .then((response) => {
        // console.log(response.data.league.standard[0]);

        res.send(response.data);
        response.data.league.standard.forEach((player) => {
          if(player.isActive) {
            activePlayerList.push(new Player(player.personId));
          }
        })
        return activePlayerList;
      })
      .catch((error) => {
        // console.log(error);
      })
  })





// });

module.exports = router;
