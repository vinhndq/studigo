/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    _config: {
        actions:   false,
        shortcuts: false,
        rest:      false
    },
    create: function(req, res) {
    // Create a User with the params sent from
    // the sign-up form --> new.ejs
    User.create(req.params.all(), function userCreated(err, user) {
      if (err) {
        req.session.flash = {
          err: err
        };
        //return res.redirect('/user/get');
        return res.json(err);
      }
      return res.json(user);
      //res.redirect('/user/get/'+user.userid);
    });
  } ,   
	get:function(req,res){
        User.find()
            .populate('roles')
            .exec(function(err,users){
                if(err){
                    return res.json(err);
                }
                return res.json(users);
            })
    },
    test:function(req,res){
         var username = req.params.name;
        console.log('test log'+username);
        return res.json({abc:'abc'});
    },
    getRoles:function(req,res){
        var username = req.params.name;
        User.findOne({username:username})
            .populate("roles")
            .exec(function(err,user){
                if(err){
                    return res.json(err);
                }
                return res.json(user.roles);
            })
    },
     edit: function (req, res) {

    // Find the user from the id passed in via params
        var userid =  req.params.userid;
    User.findOne({userid:userid})
      .exec(function(err, user) {
        if (err){ 
            return res.json(err);
        }
        //('User doesn\'t exist.');
        if (!user) {
            return res.json(err); 
        }
        return res.json(user);
    });
  },

  // process the info from edit view
  update: function (req, res) {
    User.update(req.params.userid, req.params.all(), function userUpdated (err) {
      if (err) {
         return res.json(err);
      }
       return res.json({status:'success'});
    });
  },

  destroy: function (req, res) {

    User.findOne({userid:req.params.userid})
    .exec(function(err, user) {
      if (err){

        return res.json(err);
      } 
      if (!user) {
        return res.json(err); 
      }
    });
    //('User doesn\'t exist.');
      User.destroy({userid:req.params.userid})
      .exec(function userDestroyed(err) {
        if (err) {
            return res.json(err);
        }
        return res.json({status:'success'});
    });
  },
  test: function(req, res) {
    var https = require('https');
    var options = {
      hostname: 'testing.atlassian.net',
      port: 443,
      path: '/rest/api/2/search?jql=project=ABC',
      method: 'GET',
      headers: {'Authorization': 'Basic ' + 'SuperSecretLoginAndPassword'}
    };

    https.request(options, function(response) {
        var responseData = '';
        response.setEncoding('utf8');

        response.on('data', function(chunk){
          responseData += chunk;
        });

        response.once('error', function(err){
          // Some error handling here, e.g.:
          res.serverError(err);
        });

        response.on('end', function(){
      try {
        // response available as `responseData` in `yourview`
        res.locals.requestData = JSON.parse(responseData);
      } catch (e) {
        sails.log.warn('Could not parse response from options.hostname: ' + e);
      }

      res.view('yourview');
    });
  }).end();

    },
  // process the info from edit view
  forgotPass: function (req, res) {
   var ramNum= Math.floor(Math.random() * (10 - 1 + 1) + 1);
    User.update(userid:req.params.userid,password:ramNum, function userUpdated (err) {
      if (err) {
         return res.json(err);
      }
       return res.json({status:'success'},{password:ramNum});
    });
  },
};

