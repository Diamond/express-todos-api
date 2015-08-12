var pgp = require('pg-promise')();
var cn = 'postgres://node:n0d3@localhost:5432/node_dev';
var db = pgp(cn);

var findAll = function(success, fail) {
  db.query("SELECT * FROM todos", true)
    .then(success, fail);
};

var create = function(body, success, fail) {
  db.one("INSERT INTO todos (title, completed) VALUES ($1, $2) returning id, title, completed", [body.title, body.completed])
    .then(success, fail);
};

var show = function(id, success, fail) {
  db.query("SELECT * FROM todos WHERE id = $1", id)
    .then(success, fail);
};

var deleteTodo = function(id, success, fail) {
  db.none("DELETE FROM todos WHERE id = $1", id)
    .then(success, fail);
};

var update = function(id, body, success, fail) {
  var query = [];
  var binds = [];
  if (body.title) {
    binds.push(body.title);
    query.push("title = $" + binds.length);
  }
  if (body.completed) {
    binds.push(body.completed);
    query.push("completed = $" + binds.length);
  }
  binds.push(id);
  var fullQuery = "UPDATE todos SET " + query.join(", ") + " WHERE id = $" + binds.length + " RETURNING id, title, completed";
  db.one(fullQuery, binds).then(success, fail);
};

module.exports = {
  all: findAll,
  create: create,
  show: show,
  delete: deleteTodo,
  update: update
};
