const controller = require("../controllers/seance.controller");

module.exports = app => {

    // Retrieve Seances
    app.get("/:movieName/:seanceDate/seances", controller.getSeances); 
};
