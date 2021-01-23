const db = require('./../config/database');

const validateOrderData = data => new Promise((resolve, reject) => {
    if (!data.title) {
        reject('Title missing');
    } else if (!data.description) {
        reject('Description missing');
    } else if (!data.platform) {
        reject('Platform missing');
    } else if (!data.language) {
        reject('Language missing');
    } else if (!data.deadline) {
        reject('Deadline missing');
    } else if (!data.expectedPrice) {
        reject('Expected price missing');
    } else if (!data.authorId) {
        reject('Author id missing');
    } else {
        resolve();
    }
});

const generateOrderData = orderData => ({
    id: orderData.id,
    title: orderData.title,
    deadline: orderData.deadline,
    status: orderData.status,
    expectedPrice: orderData.expected_price,
});

module.exports = {

    create: data => new Promise((resolve, reject) => {
        validateOrderData(data).then(() => db.query(
            `
                INSERT INTO nj_order
                (
                    author_id,
                    title,
                    description,
                    platform,
                    language_code,
                    expected_price,
                    deadline,
                    status
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                returning id
            `,
            [
                data.authorId,
                data.title,
                data.description,
                data.platform,
                data.language,
                data.expectedPrice,
                data.deadline,
                'ACTIVE',
            ]
        ), reject).then(result => {
            if (
                result &&
                result.rows &&
                result.rows[0] &&
                result.rows[0].id
            ) {
                resolve(result.rows[0].id);
            } else {
                reject('Order create error');
            }
        }).catch(reject);
    }),

    get: orderId => new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM nj_order WHERE id = $1',
            [orderId]
        ).then(result => {
            const orderData = result.rows[0];
            if (orderData) {
                resolve({
                    id: orderData.id,
                    authorId: orderData.author_id,
                    title: orderData.title,
                    description: orderData.description,
                    platform: orderData.platform,
                    language: orderData.language_code,
                    deadline: orderData.deadline,
                    expectedPrice: `${orderData.expected_price}`,
                });
            } else {
                reject('Order not found');
            }
        }, () => {
            reject('Order not found');
        });
    }),

    getActualOrdersByUser: userId => new Promise((resolve, reject) => {
        db.query(
            'SELECT id, title, deadline, status, expected_price FROM nj_order WHERE author_id = $1',
            [userId]
        ).then(result => {
            if (result.rows) {
                resolve(result.rows.map(generateOrderData));
            } else {
                reject('Orders not found');
            }
        }, () => {
            reject('Orders not found');
        });
    }),

    getActualJobsByUser: userId => new Promise((resolve, reject) => {
        db.query(
            'SELECT id, title, deadline, status, expected_price FROM nj_order WHERE author_id != $1',
            [userId]
        ).then(result => {
            if (result.rows) {
                resolve(result.rows.map(generateOrderData));
            } else {
                reject('Orders not found');
            }
        }, () => {
            reject('Orders not found');
        });
    }),

};
