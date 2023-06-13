const db = require("../models");
const Order = db.order;
const Sale = db.sale;

exports.createOrder = (req, res) => {

    db.sequelize.transaction((transaction) => {

        return Promise.all([
            Order.findOne({
                where: { customerId: 1, seanceId: req.body.seanceId }
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
};
