var routesModule = angular.module('appRoutes');

routesModule.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  
    .state('app', {
      url: '/app',
      templateUrl: '/js/app/views/app.html'
    })
  .state('app.movies', {
      url: '/movies',
      templateUrl: '/js/app/views/movies/base.html',
      controller: 'moviesController'
    })
  .state('app.movies.add', {
      url: '/add',
      templateUrl: '/js/app/views/movies/add.html',
      controller: 'addMoviesController'
    })
  .state('app.movies.update', {
      url: '/update/:movieId',
      templateUrl: '/js/app/views/movies/add.html',
      controller: 'updateMoviesController'
    })
  .state('app.movies.info', {
      url: '/info/:movieId',
      templateUrl: '/js/app/views/movies/info.html',
      controller: 'infoMoviesController'
    })
  .state('app.actor', {
      url: '/actor',
      templateUrl: '/js/app/views/actor/base.html',
      controller: 'actorsController'
    })
  .state('app.actor.add', {
      url: '/add',
      templateUrl: '/js/app/views/actor/add.html',
      controller: 'addActorsController'
    })
  .state('app.actor.update', {
      url: '/update/:actorId',
      templateUrl: '/js/app/views/actor/add.html',
      controller: 'updateActorsController'
    })
  .state('app.actor.info', {
      url: '/info/:actorId',
      templateUrl: '/js/app/views/actor/info.html',
      controller: 'infoActorsController'
    })
  $urlRouterProvider.otherwise('/app');
});