const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/todos_api", {useNewUrlParser: true});
mongoose.Promise = Promise;

module.exports.Todo =  require("./todo");