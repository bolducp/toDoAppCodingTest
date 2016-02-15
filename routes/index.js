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

router.post('/addTask', function(req, res, next){
  var task = new Task( {
    name: req.body.name,
    due: req.body.due,
    description: req.body.description
  });

  task.save(function(err){
    if (err) res.status(400).send(err);
    res.send();
  })
});

router.post('/deleteTask', function(req, res, next){
  Task.remove({ _id: req.body.taskId }, function(err){
    if (err) return res.status(400).send(err);
    res.send();
  })
});



module.exports = router;
