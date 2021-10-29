const sequelize = require("../config/connection");
const { User, Post, Comment } = require('../models');

const seed = async () => {
    const userData = await User.bulkCreate([
        {
            username:'kale3',
            password:'password1'
        },
        {
            username:'enyleator',
            password:'password2'
        },
        {
            username:'jilliuscaesar',
            password:'password3'
        },
        {
            username:'lisanne',
            password:'password4'
        }
    ],{
        individualHooks:true
    });
    const postData = await Post.bulkCreate([
        {
            title:'mac is lyfe',
            description:'why would you ever choose to use a pc',
            UserId:2
        },
        {
            title:'materialize or bootstrap?',
            description:'not sure which one i like better... does anyone have any opinions or other options?',
            UserId:1
        },
        {
            title:'the ultimate network',
            description:"if you haven't joined discord yet, you need to",
            UserId:3
        }
    ]);
    const commentData = await Comment.bulkCreate([
        {
            comment:"how do i sign up?",
            UserId:4,
            PostId:3
        },
        {
            comment:"or you could just use css and not be lazy",
            UserId:4,
            PostId:2
        }
    ])
}

sequelize.sync({force:true}).then(()=>{
    seed();
})