const Order = require('../../models/order');
const Task = require('../../models/task');

module.exports = (req, res) => {

    const { authorizedUser } = req.session;

    Order.get(req.params.orderId).then(resp => {
        if (
            authorizedUser.isContractor &&
            authorizedUser.id !== resp.authorId
        ) {
            Task.createTaskWithHistory(req.params.orderId, authorizedUser.id).finally(() => {
                res.json({ ...resp });
            });
        } else {
            res.json({ ...resp });
        }
    }).catch(error => {
        res.json({ error });
    });

};
