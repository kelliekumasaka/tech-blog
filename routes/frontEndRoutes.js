const express = require('express');
const { route } = require('.');
const router = express.Router();
const { User, Post, Comment } = require('../models');

router.get("/", (req, res) => {
    Post.findAll({
        order:["updatedAt"],
        include:[User]
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
    User.findOne({
        where:{id: req.session.user.id},
        include:[Post]
    }).then(userData=>{
        const hbsUser = userData.get({plain:true});
        res.render("dashboard",hbsUser)
    })
});

router.get("/login",(req,res)=>{
    res.render("login")
});

router.get("/signup",(req, res) => {
    res.render('signup')
});

router.get("/newpost",(req, res) => {
    res.render('newpost')
});

router.get("/logout",(req,res)=>{
    res.render("logout")
});

module.exports = router