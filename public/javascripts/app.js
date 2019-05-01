const url = "/api/todos/";

$(document).ready(function () {
    $.getJSON(url)
        .done(getTodos)
        .fail(handleError);

    $("#input").keypress(function (event) {
        if(event.which == 13){
            $.post(url, {name: $("#input").val()})
                .done(createTodo)
                .fail(handleError);
        }
    });

    $("#tasklist").on("click", ".removebtn", function (event) {
        event.stopPropagation();
        removeTodo($(this).parent());
    });
    $("#tasklist").on("click", "li", function () {
        updateTodo($(this));
    });
});

function getTodos(todos){
    todos.forEach(function (todo) {
        addToTodoList(todo);
    });
}

function createTodo(newTodo) {
    $("#input").val("");
    addToTodoList(newTodo);
}

function handleError(err){
    console.log(err);
}

function addToTodoList(todo){
    var todoList = '<li><i class="fa fa-plus"></i>' + todo.name + "<i class='fa fa-minus-circle removebtn'></i></li>";
    todoList = $(todoList).data("id", todo._id);
    todoList = $(todoList).data("completed", todo.completed);
    if(todo.completed){
        todoList = $(todoList).addClass("completed");
    }
    $("#tasklist").append(todoList);
}

function removeTodo(todo) {
    var taskId = todo.data("id");
        $.ajax({
            method: 'DELETE',
            url:    url + taskId
        })
            .done(function (data) {
                todo.remove();
            })
            .fail(handleError);
}
function updateTodo(todo) {
    var taskId = todo.data("id");
    var isCompleted = todo.data("completed");
        $.ajax({
            method: 'PUT',
            url:    url + taskId,
            data:   {completed: !isCompleted}
        })
            .done(function (updatedTodo) {
                todo.toggleClass("completed");
                todo.data("completed", updatedTodo.completed);
            })
            .fail(handleError);
}