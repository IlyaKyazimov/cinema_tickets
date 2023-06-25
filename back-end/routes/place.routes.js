const controller = require("../controllers/place.controller");

module.exports = function(app) {

    // Retrieve Places
    app.get("/api/:movieName/:seanceDate/:seanceCinema/:seanceTime/places", controller.getPlaces); 
    // Update Place
    app.put("/api/:movieName/:seanceDate/:seanceCinema/:seanceTime/places", controller.updatePlace);
    // Cancel order
    app.post("/api/:movieName/:seanceDate/:seanceCinema/:seanceTime/places", controller.cancelOrder);
};
