"use strict";

var app = angular.module("toDo", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state("home", {url: "/", templateUrl: "/partials/home.html", controller: "homeCtrl"})

  $urlRouterProvider.otherwise("/");
});


app.controller('homeCtrl', function($scope, Tasks){

  displayTasks();

  function displayTasks() {
    Tasks.getTasks().then(setScopeTasks, console.error)
  }

  function setScopeTasks(tasks) {
    $scope.tasks = tasks.data;
  }

  $scope.add = function(){
    var dueDate = moment($scope.due).format("MMMM Do YYYY");

    Tasks.addTask({
      name: $scope.name,
      due: dueDate,
      description: $scope.description
    }).then(updateDisplay, console.error);
  }

  function updateDisplay() {
    $scope.reset();
    displayTasks();
  }

  $scope.reset = function(){
    $scope.name = " ";
    $scope.due = " ";
    $scope.description = " ";
  }

  $scope.delete = function(taskId) {
    Tasks.deleteTask({taskId}).then(displayTasks, console.error);
  }

  $scope.toggleComplete = function(taskId) {
    Tasks.toggleComplete({taskId}).then(displayTasks, console.error);
  }
});


app.service('Tasks', function($http){
  this.getTasks = function() {
    return $http.get("/tasks");
  }

  this.addTask = function(task) {
    return $http.post("/addTask", task);
  }

  this.deleteTask = function(taskId) {
    return $http.post("/deleteTask", taskId);
  }

  this.toggleComplete = function(taskId) {
    return $http.post("/toggleComplete", taskId);
  }
});
