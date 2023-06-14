const controller = require("../controllers/cart.controller");

module.exports = app => {

    // Creat Order
    app.post("/cart", controller.createOrder);
    // Get orders
    app.get("/cart", controller.getOrders);
    // Cancel orders
    app.put("/cart", controller.cancelOrders);
};
