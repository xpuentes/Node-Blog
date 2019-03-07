const express = require('express');
const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');
const server = express();
const PORT = process.env.PORT || 8000;

server.use(express.json());
server.use((req, res, next) => {
  if(req.body.name){
    let nameArr = req.body.name.split(' ');
    for(let i = 0; i < nameArr.length; i++){
      nameArr[i] = nameArr[i].charAt(0).toUpperCase() + nameArr[i].slice(1);
    }
    req.body.name = nameArr.join(' ');
  }
  next();
});
server.use('/api', postRoutes);
server.use('/api', userRoutes);

server.listen(PORT, () => console.log(`API running on port ${PORT}`));
