const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema ({
  playerId: {
    type: String, 
    required: true
  },
  firstName: {
    type: String, 
    required: true 
  }, 
   lastName: { 
     type: String, 
     required: true
   }, 
   stats: {
     type: {}, 
     required: true
   },
   goldenscore: {
     type: String,
     required: true
   }
}
);

module.exports = mongoose.model('Player', playerSchema);