const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {};

Post.init({
    title: {
        type:DataTypes.STRING,
        validate: {
            max: 30,
            isNull:false
        }
    },
    description: {
        type:DataTypes.TEXT,
        validate: {
            isNull:false
        }
    }
},{
    sequelize
});

module.exports = Post