var mongoose = require("mongoose");


var commentSchema = mongoose.Schema({
    img:String,
    position:String,
    company:String,
    expreience:String,
    type:String,
    site:String,
    salary:String
})

module.exports = commentSchema