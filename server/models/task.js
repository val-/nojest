const db = require('./../config/database');

const listenersByTask = {};

function notifyListeners(taskId, dateTime) {
    if (listenersByTask[taskId]) {
        listenersByTask[taskId].forEach(cb => {
            cb({ lastMessageDateTime: dateTime });
        });
        listenersByTask[taskId] = [];
    }
}

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


const addTaskHistoryRecord = (taskId, nextStatus, dateTime) => new Promise((resolve, reject) => {
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
            dateTime,
            nextStatus
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
            reject('Task history add error');
        }
    }).catch(reject);
});

const setContractorPrice = (taskId, contractorPrice) => db.query(
    `
        UPDATE nj_task
        SET contractor_price = $2
        WHERE id = $1
    `,
    [
        taskId,
        contractorPrice,
    ]
);

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

const changeStatus = (taskId, nextStatus, contractorPrice) => new Promise((resolve, reject) => {
    const dateTime = new Date();
    addTaskHistoryRecord(taskId, nextStatus, dateTime).then(resp => {
        if (contractorPrice) {
            setContractorPrice(taskId, contractorPrice).then(() => {
                notifyListeners(taskId, dateTime);
                resolve(resp);    
            }, reject);
        } else {
            notifyListeners(taskId, dateTime);
            resolve(resp);
        }
    }, reject);
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

    getTaskById,

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
    }),

    statusFlowByContractor: {
        JUST_VIEWED: [ 'REQUESTED', 'REJECTED_BY_CONTRACTOR' ],
        REQUESTED: [],
        REJECTED_BY_CONTRACTOR: [],
        REJECTED_BY_CUSTOMER: [],
        ASSIGNED: [ 'CANCELLED', 'RESOLVED' ],
        RESOLVED: [],
        DISPUTE: [ 'CANCELLED' ],
        CANCELLED: [],
        DONE: [],
    },
    
    statusFlowByCustomer: {
        JUST_VIEWED: [],
        REQUESTED: [ 'ASSIGNED', 'REJECTED_BY_CUSTOMER' ],
        REJECTED_BY_CONTRACTOR: [],
        REJECTED_BY_CUSTOMER: [],
        ASSIGNED: [],
        RESOLVED: [ 'DONE', 'DISPUTE' ],
        DISPUTE: [ 'DONE' ],
        CANCELLED: [],
        DONE: [],
    },
    
    statusFlowByModerator: {
        JUST_VIEWED: [],
        REQUESTED: [],
        REJECTED_BY_CONTRACTOR: [],
        REJECTED_BY_CUSTOMER: [],
        ASSIGNED: [],
        RESOLVED: [],
        DISPUTE: [ 'CANCELLED', 'DONE' ],
        CANCELLED: [],
        DONE: [],
    },

    changeStatus,

    waitStatusChangeByTask: taskId => new Promise((resolve) => {
        if (!listenersByTask[taskId]) {
            listenersByTask[taskId] = [];
        }
        listenersByTask[taskId].push(resolve);
    }),

};
