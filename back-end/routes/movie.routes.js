const controller = require("../controllers/movie.controller");

module.exports = function(app) {

    // Retrieve all Movies
    app.get("/api/films", controller.getMovies);
};
