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
        allowNull:false,
        validate:{
            isAlphanumeric:true,
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[8],
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
