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

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  db.getById(id)
    .then(users => {
      if(users){
        res.json(users);
      } else {
        res.status(404).json({message: 'User with specified ID not found!'});
      }
    })
    .catch(err => {
      res.status(500).json({errorMessage: 'User data could not be retrieved!'});
    });
});

router.get('/users/posts/:id', (req, res) => {
  const { id } = req.params;
  db.getUserPosts(id)
    .then(users => {
      if(users[0]){
        res.json(users);
      } else {
        res.status(404).json({message: 'User with specified ID not found!'});
      }
    })
    .catch(err => {
      res.status(500).json({errorMessage: 'User data could not be retrieved!'});
    });
});

module.exports = router;
