const controller = require("../controllers/place.controller");

module.exports = app => {

    // Retrieve Cinemas
    app.get("/:movieName/:seanceDate/:seanceCinema/:seanceTime/places", controller.getPlaces); 
};
