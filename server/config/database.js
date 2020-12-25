const { Client } = require('pg');
const connectionString = 'postgres://nojest:nojest@localhost:5432/nojest';
const client = new Client({ connectionString });

client.connect();

module.exports = {
    query: (text, values) => new Promise(function(resolve, reject) {
        client.query(text, values, (err, result) => {
            if (err) {
                handleErrorMessages(err).then((message) => {
                    reject(message);
                }).catch(() => {
                    reject();
                });
            } else {
                resolve(result);
            }
        });
    })
};

function handleErrorMessages(err) {
    return new Promise((resolve) => {
        if (err.code == '23505') {
            err = 'email already in use'
        } else if (err.code == '22P02') {
            err = 'invalid user UUID'
        } else if (process.env.NODE_ENV !== 'development') {
            err = 'something went wrong, please check your input and try again'
        }
        resolve(err);
    });
}
