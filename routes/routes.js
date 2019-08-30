const express = require('express');
// const axios = require('axios');
const router = express.Router();
const joconController = require('../controller/jocon');

//HomePage
router.get('/', (req, res, next) => {
    res.send('Jocon is ALIVE!')
})

//POST TO DB 
router.get('/initDB', joconController.initDB) 

module.exports = router;