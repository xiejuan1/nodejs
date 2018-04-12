var mongoose = require("mongoose");

var UserSchemas = mongoose.Schema({
	username:String,
	pwd:String,
	email:String
})

module.exports = UserSchemas;