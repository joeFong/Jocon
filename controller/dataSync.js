const axios = require('axios');

const PlayerModel = require('../models/Player');
const Player = require('../classes/Player');

let activePlayers = [];
let playerObjectArr = [];

exports.init = (req, res, next) => {
const play_style = 'fundamental';

  getActivePlayers(2019)
    .then((activePlayers) => {
      activePlayers.forEach((player) => {
        playerObjectArr.push(new Player(player.personId, player.firstName, player.lastName))
      })
      return playerObjectArr
    })
    .then((playerArray) => {
      playerArray.forEach((player) => {
        getPlayerStats(2019, player.playerId)
          .then((data) => {
            player['stats'] = data;
            player['goldenscore'] = player.calculateGoldenScore(play_style);

            const playerDB = new PlayerModel({
              playerId: player.playerId,
              firstName: player.firstName,
              lastName: player.lastName,
              stats: data,
              goldenscore: player.goldenscore
            });

            playerDB
              .save((err, player) => {
                if (err) {
                  console.log(err);
                }
                console.log(player.firstName + ' ' + player.lastName + ' has been added to the collection');
              })
          })
      })
    })
    .catch((err) => {
      next(err);
    })
}

exports.sync = (req, res, next) => {
  PlayerModel
    .findById(playerId)
    .then(post => {
      if(!post) {
        const error = new Error('Could not find post');
        error.statusCode = 404;
        throw error;
      }
      if(post.creator.toString() !== req.userId) {
        const error = new Error('Not authorized');
        error.statusCode = 403;
        throw error;
      }
      post.name = name;
      post.skill1 = skill1; 
      post.skill2 = skill2;
      post.skill3 = skill3;
      post.link = link;
      return post.save();
    })
    .then(result => {
      res.status(200).json({message: 'Post updated', post: result}  );
    })
    .catch(err => {
      if(!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
}

  //helper function 
  function getPlayerStats(year, playerId) {
    let stats = {};

    return axios
      .get("http://data.nba.net/data/10s/prod/v1/" + year + "/players/" + playerId + "_profile.json")
      .then((success) => {
        if (success.data.league.standard.stats.regularSeason.season[0]) {
          let seasonStats = success.data.league.standard.stats.regularSeason.season[0].total;

          stats = {
            ppg: seasonStats.ppg,
            rpg: seasonStats.rpg,
            apg: seasonStats.apg,
            spg: seasonStats.spg,
            bpg: seasonStats.bpg,
            fg: (seasonStats.fgm / seasonStats.fga).toFixed(2),
            ft: (seasonStats.ftm / seasonStats.fta).toFixed(2)
          }
        }
        return stats;
      })
      .catch((err) => {
        throw err;
      })
  }

  //helper function 
  function getActivePlayers(year) {
    return axios
      .get("http://data.nba.net/10s/prod/v1/" + year + "/players.json")
      .then((success) => {
        const cur_league_players = success.data.league.standard;

        activePlayers = cur_league_players.filter((playerData) => {
          return playerData.isActive;
        })
        return activePlayers;
      })
      .catch((err) => {
        throw err;
      })
  }
}