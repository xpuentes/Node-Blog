const express = require('express');
const db = require('./data/helpers/userDb');
const router = express.Router();

router.use(express.json());

router.get('/users', (req, res) => {
  db.get()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({error: 'User data not found!'});
    });
});

module.exports = router;
