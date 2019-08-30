const express = require('express');
// const axios = require('axios');
const router = express.Router();
const dataSync = require('../controller/dataSync');
// var Jocon = require('../classes/Jocon');

//HomePage
router.get('/', (req, res, next) => {
    res.send('Jocon is ALIVE!')
});

//Jocon Restful Endpoints 
// const baseRoute = 'jocon';

// const jocon = new Jocon('joemoney888', 'jpGOTjnb92$!');

// const action = 'login';
// router.get('/' + baseRoute + '/' + action, (req, res, next) => {
//     res.send('Jocon is ALIVE!')
//     jocon.login();
// });

//POST TO DB 
router.get('/init', dataSync.init) 

//Update DB 
router.put('/syncDB', dataSync.sync);


module.exports = router;