const express = require('express');
const Post = require('../models/Post');


const router = express.Router();

router.post('/', (req, res) => {
    let myPost = new Post(req.body);
    //if existing
    Post.findOne({code_title: myPost.code_title})
    .then(()=>{
        //remove the existing
        Post.deleteOne({code_title: myPost.code_title})
        .then(()=>{
            //add the new one
            myPost.save()
            .then(() => {
                res.send("Post successfully created")
            })
            .catch(err => {
                res.status(400).send(err);
            });
        })
        .catch(()=>{
            res.json({"error":"something went wrong"});
        });
    })
    //if not records found, just simply add
    .catch(()=>{
        myPost.save()
        .then(() => {
            res.send("Post successfully created")
        })
        .catch(err => {
            res.status(400).send(err);
        });
    })
  
})

module.exports = router;