"use strict";

var app = angular.module("toDo", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state("home", {url: "/", templateUrl: "/partials/home.html", controller: "homeCtrl"})
    //.state("addTask", {url: "/addTask", templateUrl: "/partials/addTask.html", controller: "addCtrl"})

  $urlRouterProvider.otherwise("/");
});


app.controller('homeCtrl', function($scope, Tasks){

  Tasks.getTasks()
    .then(function(tasks) {
       $scope.tasks = tasks;
    },
    function(err) {
     console.error(err);
    });

  $scope.add = function(){
    Tasks.addTask({name: $scope.name, due: $scope.due, description: $scope.description })
    Tasks.getTasks();
    $scope.reset();
  }

  $scope.reset = function(){
    $scope.name = " ";
    $scope.due = " ";
    $scope.description = " ";
  }


});



app.service('Tasks', function($http){
  this.getTasks = function() {
    return $http.get("/tasks");
  }

  this.addTask = function(task) {
    return $http.post("/addTask", task);
  }


});
