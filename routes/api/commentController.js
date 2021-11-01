const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

router.post("/:id", (req, res) => {
    if(!req.session.user){
        res.status(401).json({message:"please log in"})
    }else {
        Comment.create({
            comment:req.body.comment,
            UserId:req.session.user.id,
            PostId:req.params.id
        }).then(newComment => {
            res.json(newComment)
        }).catch(err => {
            console.log(err);
            res.status(500).json("internal server error")
        })
    }
});

router.get("/", (req,res) => {
    Comment.findAll({include: [User]})
    .then(allComments => {
        res.json(allComments)
    }).catch(err => {
        console.log(err);
        res.status(500).json("internal server error")
    })
})

router.put("/:id", (req,res) => {
    if(!req.session.user){
        res.status(401).json({message:"please log in"})
    }else{
        Comment.update(req.body,{
            where:{
                id:req.params.id
            }
        }).then(updatedComment => {
            if(!updatedComment){
                res.status(404).json("comment not found")
            }else{
                res.json(updatedComment)
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json("internal server error")
        })
    }
});

router.delete("/:id", (req,res) => {
    if(!req.session.user){
        res.status(401).json({message:"please log in"})
    }else {
        Comment.destroy({where:{id:req.params.id}})
        .then(delComment => {
            if(!delComment){
                res.status(404).json("comment not found")
            }else{
                res.status(200).json("comment deleted")
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json("internal server error")
        })
    }
});

module.exports = router