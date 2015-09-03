/**
* Role.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	connection:'someMysqlServer',
	tableName: 'tblrole',
	schema:true,
	autoCreatedAt: true,
	autoUpdatedAt: true,
	autoPK:false,
	attributes: {
		roleid:{
			type: 'integer',
			required: true,
			primaryKey: true,
			autoIncrement : true
		},
		role_name: {
			type: 'String',
			required: true,
			unique: true
		},
		type:{
			type:'String',
			required:true
		},
		users:{
         	collection:"User",
          	through:"userrole"
      	}

	}
};

