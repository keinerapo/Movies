var servicesModule = angular.module('appService');
servicesModule.factory('moviesService', ['$http', function ($http) {
    return {
        addMovies: function (movies, movie) {
            movies.push(movie);
            localStorage.setItem('movies', JSON.stringify(movies));
        },
        deleteMovie: function (movies, id) {
            _.remove(movies, function (m) {
                return m.id == id;
            })
            localStorage.setItem('movies', JSON.stringify(movies));
        },
        updateMovie: function (movies, movie) {
            _.remove(movies, function (m) {
                return m.id === movie.id;
            })
            movies.push(movie);
            localStorage.setItem('movies', JSON.stringify(movies));
        },
        getAll: function () {
            return JSON.parse(localStorage.getItem('movies'));
        },
        getMovieById: function (movies, id) {
            return _.find(movies, function (m) {
                return m.id === id;
            });
        },
        getAllActors: function () {
            return JSON.parse(localStorage.getItem('actors'));
        },
        getActorsByMovs: function (actors) {
            var selectedActors = (_.filter(actors, function (a) {
                return a.selected;
            }));
            return selectedActors;
        },
        addActorByMovie: function (actor, movie) {
            var actors = JSON.parse(localStorage.getItem('actors'));;
            var upActor = _.remove(actors, function (a) {
                return a.id === actor;
            });
            if (upActor[0].movies == undefined) {
                upActor[0].movies = [];
            }
            upActor[0].movies.push(movie.id);
            actors.push(upActor[0]);
            localStorage.setItem('actors', JSON.stringify(actors));
        },
        getActorById: function (id) {
            var actors = JSON.parse(localStorage.getItem('actors'));
            var actor = _.remove(actors, function (a) {
                return a.id === id;
            });
            return actor[0];
        },
        getNoActors: function (actors) {
            var allActors = JSON.parse(localStorage.getItem('actors'));
            for (item in actors) {
                _.remove(allActors, function (a) {
                    return a.id === actors[item].id;
                });
            }
            return allActors;
        }
    };
}]);
