const controller = require("../controllers/cart.controller");

module.exports = app => {

    // Creat Order
    app.post("/cart", controller.createOrder);
};
