var passport    = require('passport'),
LocalStrategy   = require('passport-local').Strategy,
FacebookStrategy = require('passport-facebook').Strategy;

var simplecrypt = require("simplecrypt");
var passwordinput; 
var saltinput;
var methodinput;
var user1 ={
  method:methodinput,
  password:passwordinput,
  salt:saltinput
};


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({ id: id } , function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},function(email, password, done) {
  User.findOne({ email: email }, function (err, user) {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect email.'+email });
    }
    user1.password = user.pass;
    user1.salt = user.salt;
    var sc = simplecrypt(user1);
    var passCompare = sc.encrypt(password);   
    if(passCompare=== user.password){
      var returnUser = {
        email: user.email,
          id: user.userid
        };
        return done(null, returnUser, { message:'true'});
      }
      else
      {
       return done(null, false, { message: 'Logged in error' });
     }

   });
}
));
passport.use(new FacebookStrategy({
  clientID: "1596735713927173",
  clientSecret: "a6afc48bccf3c05f70a58f2b061253ab",
  callbackURL: "http://localhost:1337",
  enableProof: false
}, function (accessToken, refreshToken, profile, done) {

  findByFacebookId(profile.id, function (err, user) {

      // Create a new User if it doesn't exist yet
      if (!user) {
        User.create({

          facebookId: profile.id

          // You can also add any other data you are getting back from Facebook here 
          // as long as it is in your model

        }).done(function (err, user) {
          if (user) {
            return done(null, user, {
              message: 'Logged In Successfully'
            });
          } else {
            return done(err, null, {
              message: 'There was an error logging you in with Facebook'
            });
          }
        });

      // If there is already a user, return it
    } else {
      return done(null, user, {
        message: 'Logged In Successfully'
      });
    }
  });
}
));