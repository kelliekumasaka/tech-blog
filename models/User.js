const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");

// declares new class User (table) to extend Model from sequelize
class User extends Model {};

// initialize User table with columns
User.init({
    username: {
        type: DataTypes.STRING,
        unique:true,
        validate:{
            isAlphanumeric:true,
            isNull:false
        }
    },
    password:{
        type:DataTypes.STRING,
        validate:{
            len:[8],
            isNull:false
        }
    }
},{
    hooks:{
        // before creating a new User
        beforeCreate(newUser){
            // changes the username fully to lowercase
            newUser.username = newUser.username.toLowerCase();
            // encrypts the password with the a salt value of 5
            newUser.password = bcrypt.hashSync(newUser.password,5);
            // returns value
            return newUser;
        }
    },
    sequelize,
});

module.exports = User;
