var Task = require('./../../models/task');

module.exports = (req, res) => {

    const { taskId, nextStatus, contractorPrice } = req.body;
    const dateTime = new Date();

    // TODO permissions check!!!

    Task.changeStatus(
        taskId,
        nextStatus,
        contractorPrice
    ).then(() => {
        res.json({ success: true });
    }).catch((error) => {
        res.json({ error });
    });

};
