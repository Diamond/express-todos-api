var express = require('express');
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

router.route("/")
  .get(function(req, res) {
    res.send("Fake Todos app");
  });
var todosRoute = require("./routes/todos");

app.use("/", router);
app.use("/todos", todosRoute);

app.listen(4000, function() {
  console.log('Listening on 4000');
});
