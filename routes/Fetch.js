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
    const { limit, offset } = getPagination(page, 3);


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

    // Post.find(function (err, posts) {
    //     if (err)
    //         res.send("Some error occured while fetching the posts")

    //     res.send(JSON.stringify(posts));
    // });
})

module.exports = router;