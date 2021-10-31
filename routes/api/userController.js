const express = require('express');
const router = express.Router();
const { User, Post } = require('../../models');
const bcrypt = require("bcrypt");

// unnecessary
router.get('/', (req,res) => {
    User.findAll({
        include:[Post]
    }).then(dbUsers=>{
        if(dbUsers.length){
            res.json(dbUsers)
        } else {
            res.status(404).json({message:"No users found!"})
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"an error occured",err:err})
    })
});

// unnecessary
router.get("/:id", (req,res) => {
    User.findOne({
        where: {id: req.params.id},
        include: [Post]
    }).then(dbUsers=>{
        if(dbUsers){
            res.json(dbUsers)
        } else {
            res.status(404).json({message:"No users found!"})
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"an error occured",err:err})
    })
})

router.post("/", (req,res) => {
    User.create(req.body)
    .then(newUser => {
        res.json(newUser)
    }).catch(err=> {
        console.log(err);
        res.status(500).json("internal server error")
    })
});

router.post("/login",(req,res)=>{
    User.findOne({
        where:{
            username:req.body.username
        }
    }).then(foundUser=>{
        if(!foundUser){
            req.session.destroy();
            res.status(401).json({message:"incorrect username or password"})
        } else {
            if(bcrypt.compareSync(req.body.password,foundUser.password)){
                req.session.user = {
                    username: foundUser.username,
                    id: foundUser.id
                };
                res.status(200).json("login successful")
            } else {
                req.session.destroy();
                res.status(401).json({message:"incorrect username or password"})
            }
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
});

router.get("/logout", (req,res) => {
    req.session.destroy();
    res.send("you have been logged out")
});

module.exports = router