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

module.exports = router;
