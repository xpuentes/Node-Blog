const express = require('express');
const db = require('./data/helpers/userDb');
const router = express.Router();

router.use(express.json());

module.exports = router;
