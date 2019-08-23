var GoldenScore = require('../modules/GoldenScore');

module.exports = class Player {
  constructor(playerId, firstName, lastName, points, rebounds, assists, steals, blocks, year) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.points = parseFloat(points);
    this.rebounds = parseFloat(rebounds); 
    this.assists = parseFloat(assists);
    this.steals = parseFloat(steals); 
    this.blocks = parseFloat(blocks);

    this.year = year;

    this.goldenscore = new GoldenScore(this.year);

  } 

  calculatePlayerScore() {
    return this.goldenscore.calculateGoldenScore(this);
  }
}


