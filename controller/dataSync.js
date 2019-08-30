const PlayerModel = require('../models/Player');
const Player = require('../classes/Player');
const util = require('../util/util');

let activePlayers = [];
let playerObjectArr = [];
const play_style = 'fundamental';

exports.init = (req, res, next) => {

  util.getActivePlayers(2019)
    .then((activePlayers) => {
      activePlayers.forEach((player) => {
        playerObjectArr.push(new Player(player.personId, player.firstName, player.lastName))
      })
      return playerObjectArr
    })
    .then((playerArray) => {
      playerArray.forEach((player) => {
        util.getPlayerStats(2019, player.playerId)
          .then((data) => {
            player['stats'] = data;
            player['goldenscore'] = player.calculateGoldenScore('fundamental');

            const playerDB = new playerModel({
              _id: player.playerId,
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
    .then((result) => {
      console.log('init complete');
    })
    .catch((err) => {
      next(err);
    })
}

exports.sync = (req, res, next) => {
  util.getActivePlayers(2019)
    .then((activePlayers) => {
      activePlayers.forEach((player) => {
        playerObjectArr.push(new Player(player.personId, player.firstName, player.lastName))
      })
      return playerObjectArr
    })
    .then((playerArray) => {

      playerArray.forEach((player) => {
        util.getPlayerStats(2019, player.playerId)
          .then((data) => {
            player['stats'] = data;
            player['goldenscore'] = player.calculateGoldenScore('fundamental');

            PlayerModel.findById(player.playerId)
              .then((dbData) => {

                if (!dbData) {
                  const error = new Error('Could not find player data');
                  throw error;
                }

                dbData.firstName = player.firstName;
                dbData.lastName = player.lastName;
                dbData.stats = player.stats;
                dbData.goldenscore = player.goldenscore;

                return dbData.save();
              })
          })
      })
    })
    .then((result) => {
      console.log('sync complete');
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
}