const controller = require("../controllers/seance.controller");

module.exports = function(app) {

    // Retrieve Cinemas
    app.get("/api/:movieName/:seanceDate/seances", controller.getCinemas); 
};
