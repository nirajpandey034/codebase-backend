const express = require('express');
const Post = require('../models/Post');


const router = express.Router();

router.post('/', (req, res) => {

    let myPost = new Post(req.body);
    myPost.save()
        .then(() => {
            res.send("Post successfully created")
        })
        .catch(err => {
            res.status(400).send(err);
        })
})

module.exports = router;