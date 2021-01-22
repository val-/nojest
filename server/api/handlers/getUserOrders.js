var Order = require('../../models/order');

module.exports = (req, res) => {

    const { authorizedUser } = req.session;

    Order.getAllOrdersByUser(authorizedUser.id).then(resp => {
        res.json(resp);
    }).catch(error => {
        res.json({ error });
    });

};
