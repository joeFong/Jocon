const express = require('express');
// const axios = require('axios');
const router = express.Router();
const dataSync = require('../controller/dataSync');

//HomePage
router.get('/', (req, res, next) => {
    res.send('Jocon is ALIVE!')
})

//POST TO DB 
router.get('/initDB', dataSync.init) 

module.exports = router;