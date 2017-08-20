var mongoose = require('mongoose');

module.exports = {

	/* Create the connection to the DB */
	start : function() {
		return true;
	},
	/* Checks if the user is logged in TODO: Later change this to a userid */
	isUserLoggedIn : function(username) {
		return (username == "test") ? false : true;
	},

	/* Authenticate a user creds */
	authenticateUser : function(username, password) {
		return (username == "test" && password == "test") ? true : false;
	}, 


}