/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 var simplecrypt = require("simplecrypt");
 LocalStrategy   = require('passport-local').Strategy;
 var passport = require('passport');
 var passwordinput; 
 var saltinput;
 var methodinput;
 var user1 ={
  method:methodinput,
  password:passwordinput,
  salt:saltinput
};

module.exports = {

    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },
    show: function(req, res) {
        var username = req.params.username;
        var password  = req.params.password;
        User.findOne({'username':username})
         .exec(function(err, user) {
            if(err)
              return  res.json({error:err});
            if(user === undefined)
               return res.json({status:false,userData:user});
            else
                user1.password = user.pass;
                user1.salt = user.salt;
                var sc = simplecrypt(user1);
                var passCompare = sc.encrypt(password);   
                if(passCompare=== user.password){
                    return res.json({status:true,userData:user});
                }
                else
                {
                    return res.json({status:false,userData:user});
                }
        });
        
    },

    login: function(req, res) {
    passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                return res.send({
                    message: info.message,
                    user: user
                });
            }
            req.logIn(user, function(err) {
                if (err) res.send(err);
                return res.send({
                    message: info.message,
                    user: user
                });
            });

        })(req, res);
    },
    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    },
    facebook: function (req, res, next) {
       passport.authenticate('facebook', { scope: ['email', 'user_about_me']},
        function (err, user) {
            req.logIn(user, function (err) {
                if(err) {
                    req.session.flash = 'There was an error';
                    res.redirect('/login');
                } else {
                    req.session.user = user;
                    res.redirect('/');
                }
            });
        })(req, res, next);
    },

    'facebook/callback': function (req, res, next) {
       passport.authenticate('facebook',
        function (req, res) {
            res.redirect('/');
        })(req, res, next);
    }
};

