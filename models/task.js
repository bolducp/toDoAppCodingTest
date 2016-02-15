'use strict';

var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isComplete: { type: Boolean, default: false },
  due: Date,
  description: String
});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;
