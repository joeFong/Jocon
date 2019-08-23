var express = require('express');
var router = express.Router();

var Player = require('../classes/Player');

const axios = require('axios');

let activePlayerList = [];

const year = '2019';
function getPlayerStats(person_id) {
    return axios.get("http://data.nba.net/data/10s/prod/v1/" + year + "/players/" + person_id + "_profile.json");
}

router.get('/', function(req, res, next) {

  axios.get("http://data.nba.net/10s/prod/v1/"+ year + "/players.json").then((success) => {
      const cur_league_players = success.data.league.standard;
      let resp = [];
      let player_id_array = new Array();
      for(var i = 0; i < cur_league_players.length; i++) {
        if(cur_league_players[i].isActive) {
          player_id_array.push({
              person_id : cur_league_players[i].personId,
              first_name : cur_league_players[i].firstName,
              last_name : cur_league_players[i].lastName,
          });
        }
      }
      
      var promise_array = [];
      for(var i = 0; i < player_id_array.length; i++) {
          var player = player_id_array[i];
          promise_array.push(getPlayerStats(player_id_array[i].person_id));
          if(i == 2) { break; }
      }

      Promise.all(promise_array).then((success) => {
          //all player stats
          for(var i = 0; i < success.length; i++) {
              if(success[i].hasOwnProperty('data') &&
                success[i].data.league.standard.hasOwnProperty('stats') && 
                success[i].data.league.standard.stats.hasOwnProperty('regularSeason') && 
                success[i].data.league.standard.stats.regularSeason.hasOwnProperty('season') &&
                success[i].data.league.standard.stats.regularSeason.season.length &&
                success[i].data.league.standard.stats.regularSeason.season[0].total.hasOwnProperty('ppg') && 
                success[i].data.league.standard.stats.regularSeason.season[0].total.ppg != '-1' && 
                success[i].data.league.standard.stats.regularSeason.season[0].total.ppg != '0') {
                  let season_stats = success[i].data.league.standard.stats.regularSeason.season[0].total;
                  let total = success[i].data.league.standard.stats.regularSeason.season[0].total;
                  let player = new Player(player_id_array[i].personId, player_id_array[i].first_name, player_id_array[i].last_name, total.ppg, total.rpg, total.apg, total.spg, total.bpg, total.spg, year);
                
                  resp.push({player: player, score: player.calculatePlayerScore()});
                  console.log({player: player, score: player.calculatePlayerScore()});
              }
          }

      });

      
      res.send(resp);


  });
});

module.exports = router;
