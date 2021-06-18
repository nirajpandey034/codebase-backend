const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };

router.get('/', (req, res) => {
    const { page } = req.query;
    const { limit, offset } = getPagination(page, 6);
    
    Post.paginate({},{offset: offset, limit: limit})
    .then((posts) => {res.send({
        totalItems: posts.totalDocs,
        posts: posts.docs,
        totalPages: posts.totalPages,
        currentPage: posts.page - 1,
        hasPrevPage: posts.hasPrevPage,
        hasNextPage: posts.hasNextPage
    });
})
    .catch((err) => {res.status(500).send(err);}) 
})

router.post('/',(req, res) => {
    let codeTitle = req.body.code_title;
    Post.findOne({code_title: codeTitle})
    .then((data)=>{
        res.json(data);
    })
    .catch(err=>{
        res.status(400).json({"message" : err});
    })
})

module.exports = router;