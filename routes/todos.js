var express = require('express');
var router = express.Router();

var Todo = require('../models/todo');

router.route("/")
  .get(function(req, res) {
    Todo.all(function(data) {
      res.json(data);
    }, function(reason) {
      res.json({ errors: [reason] }).status(503);
    });
  })
  .post(function(req, res) {
    Todo.create(req.body,
      function(data) {
        res.json(data);
      }, function(reason) {
        res.json({ errors: [reason] }).status(503);
      });
  });
router.route("/:id")
  .get(function(req, res) {
    Todo.show(req.params.id,
      function(data) {
        res.json(data);
      }, function(reason) {
        res.json({ errors: [reason] }).status(503);
      });
  })
  .put(function(req, res) {
    Todo.update(req.params.id, req.body,
      function(data) {
        res.json(data);
      }, function(reason) {
        res.json({ errors: [reason] }).status(503);
      });
  })
  .delete(function(req, res) {
    Todo.delete(req.params.id,
      function() {
        res.json({ success: true });
      }, function(reason) {
        res.json({ success: false }).status(503);
      });
  });

module.exports = router;
