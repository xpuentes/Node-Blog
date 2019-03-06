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

router.get('/posts/:id', (req, res) => {
  const { id } = req.params;

  db.getById(id)
    .then(posts =>{
      if(posts){
        res.json(posts)
      }else{
        res.status(404).json({message: 'The post with specified ID does not exist!'})
      }
    }).catch(err => {
      res.status(500).json({error: 'The post could not be retrieved.'})
    });
});

router.post('/posts/:user_id', (req, res) => {
  const { user_id } = req.params;
  const { text } = req.body;

  if(!text){
    res.status(400).json({errorMessage: 'Please provide text for the post'});
  } else {
    db.insert({text, user_id})
      .then(posts => {
        res.status(201).json(posts);
      }).catch(err => {
        res.status(500).json({error: 'There was an error while saving the post to the database.'});
      });
  }
});

module.exports = router;
