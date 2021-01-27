const Order = require('../../models/order');
const Task = require('../../models/task');

module.exports = (req, res) => {

    const { authorizedUser } = req.session;

    Task.getTaskById(req.params.taskId).then(task => {

        Order.get(task.orderId).then(order => {

            const ownOrder = authorizedUser.id === order.authorId;
            const ownTask = authorizedUser.id === task.contractorId;
            const { isModerator } = authorizedUser;
            let statusFlow = false;

            if (isModerator) {
                statusFlow = Task.statusFlowByModerator;
            } else if (ownOrder) {
                statusFlow = Task.statusFlowByCustomer;
            } else if (ownTask) {
                statusFlow = Task.statusFlowByContractor;
            }

            if (statusFlow) {
                res.json({
                    ...task,
                    order,
                    nextStatusVariants: statusFlow[task.status],
                });
            } else {
                res.json({ error: 'You have no permissions to view this task' });
            }

        }).catch(error => {
            res.json({ error });
        });

    }).catch(error => {
        res.json({ error });
    });

};
