const express = require('express');
const db = require('./data/helpers/postDb');
const router = express.Router();

router.use(express.json());

module.exports = router;
