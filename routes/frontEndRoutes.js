const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models');

router.get("/", (req, res) => {
    Post.findAll({
        order:["updatedAt"],
        include:[User, Comment]
    }).then(postData=>{
        const hbsPost = postData.map(post=>post.get({plain:true}))
        res.render("home",{
            posts:hbsPost
        })
    })
});

router.get("/dashboard",(req,res)=>{
    if(!req.session.user){
        return res.redirect("/login")
    }
    User.findByPk(req.session.user.id,{
        include:[Post]
    }).then(userData=>{
        const hbsUser = userData.get({plain:true});
        res.render("dashboard",hbsUser)
    })
});

router.get("/login",(req,res)=>{
    res.render("login")
});

router.get("/logout",(req,res)=>{
    res.render("logout")
});

module.exports = router