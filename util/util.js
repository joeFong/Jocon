const axios = require('axios');

//helper function 
exports.getPlayerStats = (year, playerId) => {
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
exports.getActivePlayers = (year) => {
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