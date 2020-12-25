const db = require('./../config/database');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const activationLinkLetter = require('../letters/activationLink');

const validateUserData = (data) => new Promise((resolve, reject) => {
    if (!data.password || !data.email) {
        reject('email and/or password missing')
    } else {
        validatePassword(data.password).then(
            () => validateEmail(data.email)
        ).then(resolve).catch(reject);
    }
});

const validateEmail = (email) => new Promise((resolve, reject) => {
    if (typeof (email) !== 'string') {
        reject('email must be a string');
    } else {
        const re = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
        if (re.test(email)) {
            resolve();
        } else {
            reject('provided email does not match proper email format');
        }
    }
});

const validatePassword = (password) => new Promise((resolve, reject) => {
    if (typeof (password) !== 'string') {
        reject('password must be a string');
    } else if (password.length < 6) {
        reject('password must be at least 6 characters long');
    } else {
        resolve();
    }
});

const hashPassword = (password) => new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            reject(err);
        } else {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                }
            });
        }
    });
});

const findUserByEmail = (email) => new Promise(function(resolve, reject) {
    db.query(
        'SELECT * FROM nj_user WHERE email = $1',
        [email]
    ).then(result => {
        const user = result.rows[0];
        if (user) {
            if (user.email_confirmed) {
                resolve(user);
            } else {
                reject('E-mail not confirmed');
            }
        } else {
            reject('Authorization error');
        }
    }, () => {
        reject('Authorization error');
    });
});

const verifyPassword = (password, user) => new Promise(function(resolve, reject) {
    bcrypt.compare(password, user.password_hash, (err, result) => {
        if (result) {
            resolve(user);
        } else {
            reject('Authorization error');
        }
    });
});

const generateUserProfile = user => new Promise(function(resolve, reject) {
    resolve({
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        dateOfBirth: user.date_of_birth,
        gender: user.gender,
        avatar: user.avatar,
    });
});

module.exports = {

    login: (data) => new Promise((resolve, reject) => {
        if (!data.email || !data.password) {
            reject('Email or password missing');
        } else {
            findUserByEmail(data.email).then(
                user => verifyPassword(data.password, user)
            ).then(generateUserProfile).then(resolve).catch(() => {
                reject('Authorization error');
            });
        }
    }),

    create: (data, siteUrl) => new Promise((resolve, reject) => {
        const token = crypto.randomBytes(32).toString('hex');
        validateUserData(data).then(
            () => hashPassword(data.password)
        ).then((passwordHash) => db.query(
            'INSERT INTO nj_user (email, email_confirmed, email_confirm_token, password_hash, full_name) VALUES ($1, $2, $3, $4, $5) returning id',
            [ data.email, false, token, passwordHash, data.fullName ]
        )).then(() => activationLinkLetter(
            data.email,
            `${siteUrl}/activation/${token}`
        )).then(resolve).catch(reject);
    }),

    activation: (token) => new Promise((resolve, reject) => {
        db.query(
            'SELECT id FROM nj_user WHERE email_confirm_token = $1',
            [ token ]
        ).then(result => {
            if (result.rows[0]) {
                const { id } = result.rows[0];
                return db.query(
                    'UPDATE nj_user SET email_confirmed = TRUE WHERE id = $1',
                    [ id ]
                )
            } else {
                reject('User not found');
            }
        }).then(resolve).catch(reject);
    }),

};
