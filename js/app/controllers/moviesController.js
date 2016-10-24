var moduleController = angular.module("appController");
moduleController.controller("moviesController", ["$scope", "$rootScope", "moviesService", "$stateParams", "$uibModal", function ($scope, $rootScope, moviesService, $stateParams, $uibModal) {
    $rootScope.movies = moviesService.getAll();
    $scope.delete = function (id) {
        if (localStorage.getItem('movies') == undefined) {
            $rootScope.movies = [];
        } else {
            $rootScope.movies = moviesService.getAll();
        }
        moviesService.deleteMovie($rootScope.movies, id);
    }
    $scope.open = function (size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'add-movie.html',
            controller: 'addMoviesController',
            size: size
        });
    };
}]);

moduleController.controller("addMoviesController", ["$scope", "$rootScope", "$stateParams", "moviesService", "uuid", "$location", "$uibModal", "$uibModalInstance", function ($scope, $rootScope, $stateParams, moviesService, uuid, $location, $uibModal, $uibModalInstance) {
    if (localStorage.getItem('movies') == undefined) {
        $rootScope.movies = [];
    } else {
        $rootScope.movies = moviesService.getAll();
    }
    $scope.ActorsByMovie = moviesService.getAllActors();
    $scope.saveMovie = function () {
        $scope.movie.id = uuid.v4();
        $scope.movie.rate = 10;
        $scope.movie.actors = [];
        var temp = moviesService.getActorsByMovs($scope.ActorsByMovie);
        for (item in temp) {
            $scope.movie.actors.push(temp[item].id);
        }
        for (item in $scope.movie.actors) {
            moviesService.addActorByMovie($scope.movie.actors[item], $scope.movie);
        }
        moviesService.addMovies($rootScope.movies, $scope.movie);
        $scope.cancel();
        $location.path("/app/movies");
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };


}]);
moduleController.controller("deleteMoviesController", ["$scope", "$rootScope", "moviesService", function ($scope, $rootScope, moviesService) {
    if (localStorage.getItem('movies') == undefined) {
        alert("no movies created");
    } else {
        $rootScope.movies = moviesService.getAll();
    }
}]);
moduleController.controller("updateMoviesController", ["$scope", "$rootScope", "$stateParams", "moviesService", "$state", "$location", function ($scope, $rootScope, $stateParams, moviesService, $state, $location) {
    if (localStorage.getItem('movies') == undefined) {
        $rootScope.movies = [];
    } else {
        $rootScope.movies = moviesService.getAll();
    }
    $scope.movie = moviesService.getMovieById($rootScope.movies, $stateParams.movieId);
    $scope.NoActs = [];
    for (item in $scope.movie.actors) {
        $scope.NoActs.push(moviesService.getActorById($scope.movie.actors[item]));
    }
    $scope.ActorsByMovie = moviesService.getNoActors($scope.NoActs);
    $scope.saveMovie = function () {
        var temp = moviesService.getActorsByMovs($scope.ActorsByMovie);
        for (item in temp) {
            $scope.movie.actors.push(temp[item].id);
        }
        moviesService.updateMovie($rootScope.movies, $scope.movie);
        $location.path("/app/movies");
    }
}]);
moduleController.controller("infoMoviesController", ["$scope", "$rootScope", "$stateParams", "moviesService", "$state", function ($scope, $rootScope, $stateParams, moviesService, $state) {
    if (localStorage.getItem('movies') == undefined) {
        $rootScope.movies = [];
    } else {
        $rootScope.movies = moviesService.getAll();
    }
    $scope.movie = moviesService.getMovieById($rootScope.movies, $stateParams.movieId);
    $scope.actors = [];
    for (item in $scope.movie.actors) {
        $scope.actors.push(moviesService.getActorById($scope.movie.actors[item]));
    }
    if ($scope.movie.rate == undefined) {
        $scope.rate = 5;
    } else {
        $scope.rate = parseInt($scope.movie.rate);
    }
    $scope.max = 10;
    $scope.isReadonly = false;
    $scope.hoveringOver = function (value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };
    $scope.calcRate = function () {
        if ($scope.movie.rate == undefined) {
            $scope.movie.rate = 10;
        }
        $scope.movie.rate = ($scope.movie.rate + $scope.rate) / 2;
        moviesService.updateMovie($rootScope.movies, $scope.movie);
    };
}]);
