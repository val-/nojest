const Order = require('../../models/order');
const Task = require('../../models/task');

module.exports = (req, res) => {

    const { authorizedUser } = req.session;

    Order.get(req.params.orderId).then(resp => {
        const own = authorizedUser.id === resp.authorId;
        if (
            authorizedUser.isContractor &&
            !own
        ) {
            Task.createTaskWithHistory(req.params.orderId, authorizedUser.id).finally(() => {
                res.json({ ...resp, own });
            });
        } else {
            res.json({ ...resp, own });
        }
    }).catch(error => {
        res.json({ error });
    });

};
