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
            resolve(task);
        } else {
            reject('Task not exist');
        }
    }, () => {
        reject('Task not exist');
    });
});

const hasTask = (orderId, contractorId) => new Promise(function(resolve, reject) {
    db.query(
        'SELECT * FROM nj_task WHERE (order_id = $1) AND (contractor_id = $2)',
        [ orderId, contractorId ]
    ).then(result => {
        const task = result.rows[0];
        if (task) {
            resolve(task);
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


module.exports = {

    createTaskWithHistory: (orderId, contractorId) => new Promise((resolve, reject) => {
        hasTask(orderId, contractorId).then(existTask => {
            resolve(existTask);
        }).catch(() => {
            createTask(orderId, contractorId).then(
                taskId => {
                    createTaskHistory(taskId).then(resolve, reject);
                },
                reject,
            );
        });
    })


};
