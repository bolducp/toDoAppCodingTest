var express = require('express');
var router = express.Router();

var Task = require('../models/task');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MEAN To Do App' });
});

router.get('/tasks', function(req, res, next) {
  Task.find({}, function(err, tasks){
    if (err) return res.status(400).send(err);
    res.send(tasks);
  })
});


module.exports = router;
