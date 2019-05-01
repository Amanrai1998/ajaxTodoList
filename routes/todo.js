var express = require('express'),
    router = express.Router(),
    helpers = require("../helpers/todos");

/* GET home page. */
router.route('/')
    .get(helpers.getTodos)
    .post(helpers.createTodo);

router.route("/:todoId")
    .get(helpers.showTodo)
    .put(helpers.updateTodo)
    .delete(helpers.deleteTodo);

module.exports = router;
