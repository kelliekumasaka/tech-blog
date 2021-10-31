const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

Post.belongsTo(User);

User.hasMany(Post, {
    foreignKey:'UserId',
    onDelete:'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey:'PostId',
    onDelete: "CASCADE"
});

Comment.belongsTo(Post);

Comment.belongsTo(User, {
    foreignKey:'UserId',
    onDelete:"CASCADE"
});

module.exports = { User, Post, Comment }