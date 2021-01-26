const Order = require('../../models/order');
const Task = require('../../models/task');

module.exports = (req, res) => {

    const { authorizedUser } = req.session;

    Order.get(req.params.orderId).then(resp => {
        const own = authorizedUser.id === resp.authorId;
        if (own) {
            Task.getTasksByOrder(req.params.orderId).then(tasks => {
                res.json({
                    own: true,
                    tasks,
                    ...resp,
                });
            }).catch(error => {
                res.json({ error });
            });
        } else if (authorizedUser.isContractor) {
            Task.createTaskWithHistory(req.params.orderId, authorizedUser.id).then(newOrExistTask => {
                res.json({
                    own: false,
                    tasks: [ newOrExistTask ],
                    ...resp,
                });
            }).catch(error => {
                res.json({ error });
            });
        } else {
            res.json({
                own: false,
                tasks: [],
                ...resp,
            });
        }
    }).catch(error => {
        res.json({ error });
    });

};
