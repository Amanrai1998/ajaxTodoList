var db      = require("../models");

var helpers = {};

helpers.getTodos = function(req, res) {
    db.Todo.find()
        .then(function(todos){
            res.json(todos);
        })
        .catch(function(error){
            res.send(error.message);
        });
}

helpers.createTodo = function (req, res) {
    db.Todo.create(req.body)
        .then(function (newTodo) {
            res.json(newTodo);
        })
        .catch(function (error) {
            res.send(error.message);
        });
}

helpers.showTodo = function (req, res) {
    db.Todo.findById(req.params.todoId)
        .then(function (foundTodo) {
            res.json(foundTodo);
        })
        .catch(function (error) {
            res.send(error);
        })
}

helpers.updateTodo = function (req, res) {
    db.Todo.findByIdAndUpdate(req.params.todoId, req.body, {new: true})
        .then(function (updatedTodo) {
            res.json(updatedTodo);
        })
        .catch(function (error) {
            res.send(error);
        })
}

helpers.deleteTodo = function (req, res) {
    db.Todo.remove({_id: req.params.todoId})
        .then(function () {
            res.json({message: "Todo deleted"});
        })
        .catch(function (error) {
            res.send(error);
        });
}

module.exports = helpers;