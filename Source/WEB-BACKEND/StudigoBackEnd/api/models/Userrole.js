/**
* UserRole.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
connection:'someMysqlServer',
	tableName: 'user_role',
	schema:true,
	autoCreatedAt: true,
	autoUpdatedAt: true,
	autoPK:false,
  attributes: {
	roleid:{
		model:'Role'
	},
	userid:{
		model:'User'
	}
  }
};

