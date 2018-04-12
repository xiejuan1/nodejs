var mongoose = require("mongoose");

var UserSchemas = require("../schemas/use");

var User = mongoose.model("users",UserSchemas);

module.exports = User;
