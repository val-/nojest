var Order = require('./../../models/order');

module.exports = (req, res) => {

    const authorId = req.session.authorizedUser.id;
    const siteUrl = req.protocol + '://' + req.get('host');

    Order.create({
        ...req.body,
        authorId,
        siteUrl,
    }).then(orderId => {
        res.json({ orderId });
    }).catch((error) => {
        res.json({ error });
    });

};
