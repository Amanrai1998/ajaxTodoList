var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    todoRoutes  = require("./routes/todo"),
    port        = process.env.PORT;
    // ip      = process.env.IP || 192.168.0.6;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/todos.html");
});

app.use("/api/todos", todoRoutes);

app.listen(port, function () {
    console.log("Server Started At " + port);
});