const request = require('request');
const axios = require('axios');


module.exports = class GoldenScore {

    constructor(year) {
        this.year = year;
    }
    calculateGoldenScore() {
        console.log('calculating..');
        var wrapper = this;
        axios.get("http://data.nba.net/10s/prod/v1/"+ this.year + "/players.json").then((success) => {
            const cur_league_players = success.data.league.standard;
            let player_id_array = new Array();
            
            for(var i = 0; i < cur_league_players.length; i++) {
                player_id_array.push({
                    person_id : cur_league_players[i].personId,
                    first_name : cur_league_players[i].firstName,
                    last_name : cur_league_players[i].lastName,
                });
            }

            var promise_array = [];
            for(var i = 0; i < player_id_array.length; i++) {
                var player = player_id_array[i];
                // console.log(player);
                promise_array.push(this.getPlayerStats(player_id_array[i].person_id));
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
                        
                    }
                }
            });
        });
    }

    getPlayerStats(person_id) {
        return axios.get("http://data.nba.net/data/10s/prod/v1/" + this.year + "/players/" + person_id + "_profile.json");
    }
}