"use strict";

var app = angular.module("toDo", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state("home", {url: "/", templateUrl: "/partials/home.html", controller: "homeCtrl"})
    //.state("addTask", {url: "/addTask", templateUrl: "/partials/addTask.html", controller: "addCtrl"})

  $urlRouterProvider.otherwise("/");
});


app.controller('homeCtrl', function($scope){



});

app.service('Tasks', function(){

});
