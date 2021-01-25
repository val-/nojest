const Task = require('../../models/task');

module.exports = (req, res) => {

    Task.getTasksByOrder(req.params.orderId).then(resp => {
        res.json(resp);
    }).catch(error => {
        res.json({ error });
    });

};
