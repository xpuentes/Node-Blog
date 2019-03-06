const express = require('express');
const db = require('./data/helpers/postDb');
const router = express.Router();

router.use(express.json());

router.get('/posts', (req, res) => {
  db.get()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({error: 'The posts could not be retrieved!'});
    });
});

module.exports = router;
