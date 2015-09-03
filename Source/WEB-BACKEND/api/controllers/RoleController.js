/**
 * RoleController
 *
 * @description :: Server-side logic for managing roles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    get:function(req,res){
        Role.find()
            .populate("users")
            .exec(function(err,roles){
                if(err){
                    return res.json(err);
                }
                return res.json(roles);
            })
    },
    getUsers:function(req,res){
        var role_name = req.params.name;
        Role.findOne({role_name:role_name})
            .populate("users")
            .exec(function(err,role){
                if(err){
                    return res.json(err)
                }
                return res.json(role.users);
            })
    }
};

