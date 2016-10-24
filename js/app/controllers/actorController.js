var moduleController = angular.module("appController");
moduleController.controller("actorsController", ["$scope", "$rootScope", "actorService", "$stateParams", "$uibModal", function ($scope, $rootScope, actorService, $stateParams, $uibModal) {
    $rootScope.actors = actorService.getAll();
    $scope.delete = function (id) {
        if (localStorage.getItem('actors') == undefined) {
            $rootScope.actors = [];
        } else {
            $rootScope.actors = actorService.getAll();
        }
        actorService.deleteActor($rootScope.actors, id);
    }
    
    $scope.open = function(size){
         var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'add-alumno.html',
      controller: 'ModalAController',
      size: size
    });
        
    };
    
}]);

moduleController.controller("addActorsController", ["$scope", "$rootScope", "$stateParams", "actorService", "uuid","$location", function ($scope, $rootScope, $stateParams, actorService, uuid,$location) {
    if (localStorage.getItem('actors') == undefined) {
        $rootScope.actors = [];
    } else {
        $rootScope.actors = actorService.getAll();
    }
    $scope.MoviesByActor = actorService.getAllMovies();
    $scope.saveActor = function () {
        $scope.actor.id = uuid.v4();
        $scope.actor.movies = [];
        var temp = actorService.getMoviesByActs($scope.MoviesByActor);
        for(item in temp){
            $scope.actor.movies.push(temp[item].id);
        }
        for(item in $scope.actor.movies){
            actorService.addMovieByActor($scope.actor.movies[item],$scope.actor);
        }
        actorService.addActor($rootScope.actors, $scope.actor);
        $location.path("/app/actor");
    }
}]);
moduleController.controller("deleteActorsController", ["$scope", "$rootScope", "actorService", function ($scope, $rootScope, actorService) {
    if (localStorage.getItem('actors') == undefined) {
        alert("no actors created");
    } else {
        $rootScope.actors = JSON.parse(localStorage.getItem('actors'));
    }
}]);
moduleController.controller("updateActorsController", ["$scope", "$rootScope", "$stateParams", "actorService", "$state","$location", function ($scope, $rootScope, $stateParams, actorService, $state,$location) {
    if (localStorage.getItem('actors') == undefined) {
        $rootScope.actors = [];
    } else {
        $rootScope.actors = actorService.getAll();
    }
    $scope.actor = actorService.getActorById($rootScope.actors, $stateParams.actorId);
    $scope.saveActor = function () {
        actorService.updateActor($rootScope.actors, $scope.actor);
        $location.path("/app/actor");
    }
}]);
moduleController.controller("infoActorsController", ["$scope", "$rootScope", "$stateParams", "actorService", "$state", function ($scope, $rootScope, $stateParams, actorService, $state) {
    if (localStorage.getItem('actors') == undefined) {
        $rootScope.actors = [];
    } else {
        $rootScope.actors = actorService.getAll();
    }
    $scope.actor = actorService.getActorById($rootScope.actors, $stateParams.actorId);
    $scope.movies = [];
    for(item in $scope.actor.movies){
        $scope.movies.push(actorService.getMovieById($scope.actor.movies[item]));
    }
}]);
