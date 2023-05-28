const controller = require("../controllers/movie.controller");

module.exports = app => {

    // Retrieve all Movies
    app.get("/films", controller.findAll); 
};
