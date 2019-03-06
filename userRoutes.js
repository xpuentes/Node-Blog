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
      res.status(500).json({error: 'User data could not be retrieved!'});
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
      res.status(500).json({error: 'User data could not be retrieved!'});
    });
});

router.post('/users', (req, res) => {
  const { name } = req.body;

  if(!name){
    res.status(400).json({errorMessage: 'Please provide a name for the user!'});
  } else {
    db.insert({name})
      .then(users => {
        res.status(201).json(users);
      })
      .catch(err => {
        res.status(500).json({error: 'User could not be saved to the database!'});
      });
  }
});

router.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if(!name){
    res.status(400).json({errorMessage: 'Please provide an updated name for the user!'});
  } else {
    db.update(id, {name})
      .then(users => {
        if(users){
          res.status(200).json({id, name});
        } else {
          res.status(404).json({message: 'The user with specified ID could not be found!'});
        }
      })
      .catch(err => {
        res.status(500).json({errorMessage: 'The users name could not be modified!'})
      });
  }
});

router.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(users => {
      if(users){
        res.json(users);
      } else {
        res.status(404).json({message: 'The user with specified ID does not exist!'});
      }
    })
    .catch(err => {
      res.status(500).json({errorMessage: 'The user could not be deleted!'});
    });
});

module.exports = router;
