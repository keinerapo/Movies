var servicesModule = angular.module('appService');
servicesModule.factory('actorService', ['$http', function ($http) {
    return {
        addActor: function(actors,actor){
                actors.push(actor);
                localStorage.setItem('actors',JSON.stringify(actors));
                },
        deleteActor: function(actors,id){
            _.remove(actors,function(a){
                return a.id == id;
            })
            localStorage.setItem('actors',JSON.stringify(actors));
        },
        updateActor: function(actors, actor){
            _.remove(actors,function(a){
                return a.id === actor.id;
            })
            actors.push(actor);
            localStorage.setItem('actors',JSON.stringify(actors));
        },
        getAll: function(){
            return JSON.parse(localStorage.getItem('actors'));
        },
        getActorById: function(actors,id){
             return _.find(actors, function(a) {
                return a.id === id;
            });
        },
        getAllMovies: function(){
            return JSON.parse(localStorage.getItem('movies'));
        },
        getMoviesByActs: function(movies){
            var selectedMovies = (_.filter(movies,function(m){
                return m.selected;
            }));
            return selectedMovies;
        },
        addMovieByActor: function(movie,actor){
            var movies = JSON.parse(localStorage.getItem('movies'));
            var upMovie = _.remove(movies,function(m){
                return m.id === movie;
            });
            if(upMovie[0].actors == undefined){
                upMovie[0].actors = [];
            }
            upMovie[0].actors.push(actor.id);
            console.log(upMovie[0]);
            movies.push(upMovie[0]);
            localStorage.setItem('movies',JSON.stringify(movies));
        },
        getMovieById: function(id){
            var movies = JSON.parse(localStorage.getItem('movies'));
            var movie = _.remove(movies,function(m){
                return m.id === id;
            });
            return movie[0];
        },
        getNoMovies: function (movies) {
            var allMovies = JSON.parse(localStorage.getItem('movies'));
            for (item in movies) {
                _.remove(allMovies, function (m) {
                    return m.id === movies[item].id;
                });
            }
            return allMovies;
        }
    }
}]);