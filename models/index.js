const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

Post.belongsTo(User, {
    foreignKey:'UserId',
    onDelete:"CASCADE"
});

Post.hasMany(Comment, {
    onDelete: "CASCADE",
    foreignKey:'PostId'
});

Comment.belongsTo(User, {
    foreignKey:'UserId',
    onDelete:"CASCADE"
});

module.exports = { User, Post, Comment }