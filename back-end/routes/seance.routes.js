const controller = require("../controllers/seance.controller");

module.exports = app => {

    // Retrieve Cinemas
    app.get("/:movieName/:seanceDate/seances", controller.getCinemas); 
};
