const express = require('express');
const router = express.Router();
const { Post, User } = require('../../models');

router.get("/",(req,res) => {
    Post.findAll(req.body, {
        include: [User]
    }).then(allPosts => {
        res.json(allPosts)
    }).catch(err => {
        console.log(err);
        res.status(500).json("internal server error")
    })
})

router.post("/", (req,res) => {
    if(!req.session.user){
        res.status(401).json({message:"please log in"})
    }else{
        Post.create({
          title: req.body.title,
          description: req.body.description,
          UserId:req.session.user.id
        })
          .then(newPost => {
            res.json(newPost);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ message: "an error occured", err: err });
        });
    }
});

router.put("/:id", (req,res) => {
    if(!req.session.user){
        res.status(401).json("please log in")
    }else {
        Post.update(req.body,{
            where:{
                id:req.params.id
            }
        }).then(updatedPost => {
            if(!updatedPost){
                res.status(404).json("post not found")
            }else{
                res.json(updatedPost)
            }
        }).catch(err =>{
            console.log(err);
            res.status(500).json("internal server error")
        })
    }
});

router.delete("/:id", (req,res) => {
    if(!req.session.user){
        res.status(401).json("please log in")
    }else{
        Post.destroy({where:{id:req.params.id}})
        .then(delPost => {
            if(!delPost){
                res.status(404).json("post not found")
            }else{
                res.status(200).json("post deleted")
            }
        }).catch(err=>{
            console.log(err);
            res.status(500).json("internal server error")
        })
    }
});

module.exports = router