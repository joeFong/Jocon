const request = require('request');
const axios = require('axios');


module.exports = class GoldenScore {

    constructor(year) {
        this.year = year;
    }
    calculateGoldenScore() {
        var wrapper = this;
        axios.get("http://data.nba.net/10s/prod/v1/"+ this.year + "/players.json").then((success) => {
            const cur_league_players = success.data.league.standard;
            let player_id_array = new Array();
            
            for(var i = 0; i < cur_league_players.length; i++) {
                player_id_array.push(cur_league_players[i].personId);
            }

            for(var i = 0; i < player_id_array.length; i++) {
                this.getPlayerStats(player_id_array[i]).then((resp) => {
                    // console.log(resp);
                });
            }

        });
        // request.get("http://data.nba.net/10s/prod/v1/"+ this.year + "/players.json", (error, response, data) => {
        //     const parsedData = JSON.parse(data);
        //     const cur_league_players = parsedData.league.standard;

        //     let player_id_array = new Array();

        //     for(var i = 0; i < cur_league_players.length; i++) {
        //         player_id_array.push(cur_league_players[i].personId);
        //     }

        //     console.log(player_id_array);

        //     for(var i = 0; i < player_id_array.length; i++) {
        //         this.getPlayerStats(player_id_array[i]).then((resp) => {
        //             console.log(resp);
        //         });
        //     }
        // });
    }

    getPlayerStats(person_id) {
        return axios.get("http://data.nba.net/data/10s/prod/v1/" + this.year + "/players/" + person_id + "_profile.json");
    }
}