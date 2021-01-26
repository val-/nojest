const db = require('./../config/database');

const createTask = (orderId, contractorId) => new Promise((resolve, reject) => {
    db.query(
        `
            INSERT INTO nj_task
            (
                order_id,
                contractor_id,
                contractor_price
            )
            VALUES ($1, $2, $3)
            returning id
        `,
        [
            orderId,
            contractorId,
            0,
        ]
    ).then(result => {
        if (
            result &&
            result.rows &&
            result.rows[0] &&
            result.rows[0].id
        ) {
            resolve(result.rows[0].id);
        } else {
            reject('Task create error');
        }
    }).catch(reject);
});

const getTaskById = id => new Promise(function(resolve, reject) {
    db.query(
        'SELECT * FROM nj_task WHERE id = $1',
        [id]
    ).then(result => {
        const task = result.rows[0];
        if (task) {
            addTaskHistory(reformatTask(task)).then(resolve, reject)
        } else {
            reject('Task not exist');
        }
    }, () => {
        reject('Task not exist');
    });
});

const getTaskByOrderAndContractor = (orderId, contractorId) => new Promise(function(resolve, reject) {
    db.query(
        'SELECT * FROM nj_task WHERE (order_id = $1) AND (contractor_id = $2)',
        [ orderId, contractorId ]
    ).then(result => {
        const task = result.rows[0];
        if (task) {
            addTaskHistory(reformatTask(task)).then(resolve, reject);
        } else {
            reject('Task not exist');
        }
    }, () => {
        reject('Task not exist');
    });
});

const createTaskHistory = taskId => new Promise((resolve, reject) => {
    db.query(
        `
            INSERT INTO nj_task_history
            (
                task_id,
                date_time,
                status
            )
            VALUES ($1, $2, $3)
            returning id
        `,
        [
            taskId,
            new Date(),
            'JUST_VIEWED'
        ]
    ).then(result => {
        if (
            result &&
            result.rows &&
            result.rows[0] &&
            result.rows[0].id
        ) {
            resolve(result.rows[0].id);
        } else {
            reject('Task history create error');
        }
    }).catch(reject);
});

const addTaskHistory = task => new Promise((resolve, reject) => {
    db.query(
        'SELECT * FROM nj_task_history WHERE task_id = $1',
        [ task.id ]
    ).then(result => {
        const history = result.rows.map(
            row => ({
                dateTime: row.date_time,
                id: row.id,
                status: row.status,
                taskId: row.task_id,
            }),
        );
        resolve({
            ...task,
            status: history[history.length-1].status,
            history
        });
    }, () => {
        reject('Task history not found');
    });
});

const reformatTask = taskRow => ({
    contractorId: taskRow.contractor_id,
    contractorPrice: taskRow.contractor_price,
    orderId: taskRow.order_id,
    status: taskRow.status,
    id: taskRow.id,
});


module.exports = {

    createTaskWithHistory: (orderId, contractorId) => new Promise((resolve, reject) => {
        getTaskByOrderAndContractor(orderId, contractorId).then(existTask => {
            resolve(existTask);
        }).catch(() => {
            createTask(orderId, contractorId).then(
                taskId => {
                    createTaskHistory(taskId).then(() => {
                        getTaskById(taskId).then(resolve, reject);
                    }, reject);
                },
                reject,
            );
        });
    }),

    getTaskByOrderAndContractor,

    getTasksByOrder: orderId => new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM nj_task WHERE order_id = $1',
            [ orderId ]
        ).then(result => {
            Promise.all(result.rows.map(reformatTask).map(addTaskHistory)).then(resolve, reject);
        }, () => {
            reject('Tasks not found');
        });
    })


};
