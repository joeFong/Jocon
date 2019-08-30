const express = require('express');
// const axios = require('axios');
const router = express.Router();

const joconController = require('../controller/jocon');

//POST TO DB 
router.get('/', joconController.sync) 

module.exports = router;