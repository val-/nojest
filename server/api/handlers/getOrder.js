var Order = require('../../models/order');

module.exports = (req, res) => {

    Order.get(req.params.orderId).then(resp => {
        res.json({ ...resp });
    }).catch(error => {
        res.json({ error });
    });

};
