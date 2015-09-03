/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var passport    = require('passport');
var simplecrypt = require("simplecrypt");

module.exports = {
    connection:'someMysqlServer',
    tableName: 'tbluser',
    schema:true,
    autoCreatedAt: false,
    autoUpdatedAt: false,
    autoPK:false,
    attributes: {
        userid:{
            type: 'integer',
            required: false,
            primaryKey: true,
            autoIncrement : true
        },
        email: {
            type: 'email',
            required: true,
            unique: true
        },
        username: {
            type: 'string',
            required: false
        },
        password: {
            type: 'string',
            minLength: 1,
            required: true
        },
        salt:{
            type:'string'
        },
        pass:{
            type:'string'
        },
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            delete obj.salt;
            delete obj.pass;
            return obj;
        },
        roles:{
            collection:"Role",
            throught:'userrole'

        }
    },
    beforeCreate: function(user, cb) {
        var sc          = simplecrypt();
        user.password = sc.encrypt(user.password);
        user.salt = sc.salt();
        user.pass= sc.password();
        cb();
        
    }
    ,
    beforeUpdate: function(user, next) {
        if(user.password) {
            var sc          = simplecrypt();
            user.password = sc.encrypt(user.password);
            next();
        } else {
        next();
        }
    }   
};

