var express = require('express');
var router = express.Router();
const request = require('request');

router.get('/', function(req, res, next) {
  let page = 0; 
  let per_page = 100;

  let allPlayersRequest = `https://www.balldontlie.io/api/v1/players?page=${page}&per_page=${per_page}`

  request.get(allPlayersRequest, (error, response, data) => {
    const parsedData = JSON.parse(data);
    res.send(parsedData);

    let allPlayersPerPage = parsedData.data;

    allPlayersPerPage.forEach((player) => {
      // console.log(player.team.city);
    })
  })
});

module.exports = router;
