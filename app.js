var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");

var config = require("./config");
var setupController = require("./api/controllers/setupController");
var todoController = require("./api/controllers/todoController");

var app = express();
var port = process.env.port || 3000;

app.use("/assets", express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan("dev"));

app.set("view engine", "ejs");

//do info
// console.log(config.getDbConnectionString());
mongoose.connect(config.getDbConnectionString());

setupController(app);
todoController(app);

app.get("/", function(req, res){
    res.render("index.ejs");
});

app.listen(port, function(){
    console.log("App listening on port: ", port);
});