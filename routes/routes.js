const express = require('express');
// const axios = require('axios');
const router = express.Router();
const dataSync = require('../controller/dataSync');

//HomePage
router.get('/', (req, res, next) => {
    res.send('Jocon is ALIVE!')
});


//Jocon Restful Endpoints 
const baseRoute = 'jocon';
router.get('/' + baseRoute + '/', (req, res, next) => {
    res.send('Jocon is ALIVE!')
});

//POST TO DB 
router.post('/initDB', dataSync.init) 

//Update DB 
router.put('/syncDB', dataSync.sync);

module.exports = router;