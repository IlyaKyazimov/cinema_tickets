const db = require("../models");
const Order = db.order;
const Sale = db.sale;

exports.createOrder = (req, res) => {

    db.sequelize.transaction((transaction) => {

        return Promise.all([
            Order.findOne({
                where: { customerId: 1, seanceId: req.body.seanceId, status: 'New' || 'Waiting_payment' || 'Canceled_payment' }
            }).then(order => {

                if (!order) {
                    Order.create({
                        status: 'New',
                        customerId: 1,
                        recieptId: 1,
                        seanceId: req.body.seanceId
                    }).then(order => {
                        for (let seatsRow of req.body.seatsRows) {
                            for (let seat of seatsRow) {
                                if (seat.status == 'Reserved') {

                                    Sale.findOne({
                                        where: {
                                            orderId: order.dataValues.id
                                        },
                                        include: [{
                                            association: 'ticket',
                                            where: { line: seat.line, number: seat.number }
                                        }]
                                    }).then(sale => {
                                        if (!sale) {
                                            Sale.create({
                                                price: req.body.ticketPrice,
                                                orderId: order.dataValues.id,
                                                ticket: {
                                                    line: seat.line,
                                                    number: seat.number
                                                }
                                            }, {
                                                include: [{
                                                    association: 'ticket'
                                                }]
                                            }, { transaction })
                                        }
                                    })
                                } else {
                                    Sale.destroy({
                                        where: {
                                            orderId: order.dataValues.id
                                        },
                                        include: [{
                                            association: 'ticket',
                                            where: { line: seat.line, number: seat.number }
                                        }]
                                    }, { transaction })
                                }
                            }
                        }
                    })

                } else {

                    for (let seatsRow of req.body.seatsRows) {
                        for (let seat of seatsRow) {
                            if (seat.status == 'Reserved') {

                                Sale.findOne({
                                    where: {
                                        orderId: order.dataValues.id
                                    },
                                    include: [{
                                        association: 'ticket',
                                        where: { line: seat.line, number: seat.number }
                                    }]
                                }).then(sale => {
                                    if (!sale) {
                                        Sale.create({
                                            price: req.body.ticketPrice,
                                            orderId: order.dataValues.id,
                                            ticket: {
                                                line: seat.line,
                                                number: seat.number
                                            }
                                        }, {
                                            include: [{
                                                association: 'ticket'
                                            }]
                                        }, { transaction })
                                    }
                                })
                            } else {
                                Sale.destroy({
                                    where: {
                                        orderId: order.dataValues.id
                                    },
                                    include: [{
                                        association: 'ticket',
                                        where: { line: seat.line, number: seat.number }
                                    }]
                                }, { transaction })
                            }
                        }
                    }

                }

            })

        ]);
    })
        .then(data => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating order."
            });
        });
};

exports.getOrders = (req, res) => {
    Order.findAll({
        where: { customerId: 1, status: 'New' || 'Waiting_payment' },
        include: [{
            model: db.seance,
            attributes: ['date', 'time'],
            include: [{
                model: db.movie,
                attributes: ['name', 'ageRating']
            }, {
                model: db.cinema,
                attributes: ['name', 'address']
            }, {
                model: db.placesInfo,
                include: [{
                    model: db.place,
                    attributes: ['line', 'number', 'status']
                }]
            }]
        }, {
            association: 'sales',
            attributes: ['price'],
            include: [{
                association: 'ticket',
                attributes: ['line', 'number']
            }]
        }]
    })
        .then(data => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving orders."
            });
        });
}

const PlacesInfo = db.placesInfo;
const Place      = db.place;

exports.cancelOrders = (req, res) => {

    db.sequelize.transaction((transaction) => {
        return Promise.all([
            Order.destroy({
                where: { customerId: 1, seanceId: req.body.seanceId }
            }, { transaction }),
            PlacesInfo.update({ free: req.body.placesInfoFree, busy: req.body.placesInfoBusy }, {
                where: { id: req.body.placesInfoId }
            }, { transaction }),
            Place.update({ status: 'Free' }, {
                where: { placesInfoId: req.body.placesInfoId, status: 'Reserved' }
            }, { transaction })
        ]);
    })
    .then(() => {
        res.status(200).send({
            message: "Order was canceled successfully."
        });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Error canceling order"
        })
    });
}

exports.payOrders = (req, res) => {

    db.sequelize.transaction((transaction) => {
        return Promise.all([
            Order.update({ status: 'Paid'},{
                where: { customerId: 1, seanceId: req.body.seanceId }
            }, { transaction }),
            Place.update({ status: 'Sold' }, {
                where: { placesInfoId: req.body.placesInfoId, status: 'Reserved' }
            }, { transaction })
        ]);
    })
    .then(() => {
        res.status(200).send({
            message: "Order was paid successfully."
        });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Error paying order"
        })
    });
}
