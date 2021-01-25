module.exports = {

    sendLetter: data => new Promise((resolve, reject) => {
        db.query(
            `
                INSERT INTO nj_message
                (
                    author_id,
                    task_id,
                    date_time,
                    letter
                )
                VALUES ($1, $2, $3, $4)
                returning id
            `,
            [
                data.authorId,
                data.taskId,
                data.dateTime,
                data.letter,
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
                reject('Send letter error');
            }
        }, () => {
            reject('sendLetter() method error');
        });
    }),

    getLettersByTask: taskId => new Promise((resolve, reject) => {
        db.query(
            'SELECT id, author_id, date_time, letter FROM nj_message WHERE task_id = $1',
            [taskId]
        ).then(result => {
            resolve(result.rows);
        }, () => {
            reject('getLettersByTask() method error');
        });
    }),


};
