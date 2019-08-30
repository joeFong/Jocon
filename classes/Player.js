class Player {
  constructor(playerId, firstName, lastName) {
    this.playerId = playerId;
    this.firstName = firstName;
    this.lastName = lastName;

    this.stats = {
      ppg: 0,
      rpg: 0,
      apg: 0,
      spg: 0,
      bpg: 0,
      fg: 0,
      ft: 0
    }
  } 

  // Require more thought into different AI playstyles. 
  calculateGoldenScore(playStyle) {
  
      if (playStyle === 'fundamental') {
        return (parseFloat(this.stats.ppg) + parseFloat(this.stats.rpg) + parseFloat(this.stats.apg) + parseFloat(this.stats.spg) + parseFloat(this.stats.bpg)).toFixed(2); 
      } 
  }

}

module.exports = Player;


