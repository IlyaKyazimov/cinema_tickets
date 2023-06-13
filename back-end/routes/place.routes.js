const controller = require("../controllers/place.controller");

module.exports = app => {

    // Retrieve Places
    app.get("/:movieName/:seanceDate/:seanceCinema/:seanceTime/places", controller.getPlaces); 
    // Update Place
    app.put("/:movieName/:seanceDate/:seanceCinema/:seanceTime/places", controller.updatePlace);
    // Cancel order
    app.post("/:movieName/:seanceDate/:seanceCinema/:seanceTime/places", controller.cancelOrder);
};
