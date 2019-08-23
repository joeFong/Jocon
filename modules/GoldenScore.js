const axios = require('axios');

module.exports = class GoldenScore {

    constructor(year) {
        this.year = year;
    }

    getYear() {
        return this.year;
    }

    calculateGoldenScore(player) {
        return parseFloat(player.ppg) + parseFloat(player.rpg) + parseFloat(player.apg) + parseFloat(player.spg) + parseFloat(player.bpg); 
    }

}