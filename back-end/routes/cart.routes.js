const controller = require("../controllers/cart.controller");

module.exports = function(app) {

    // Creat Order
    app.post("/api/cart", controller.createOrder);
    // Get orders
    app.get("/api/cart", controller.getOrders);
    // Cancel orders
    app.put("/api/cart", controller.cancelOrders);
    // Pay orders
    app.patch("/api/cart", controller.payOrders);
};
