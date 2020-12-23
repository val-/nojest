var User = require('./../../models/user');

const checkError = (params) => {
    if (!params.email) return 'Empty e-mail';
    if (!params.password) return 'Empty password';
    if (!params.fullName) return 'Empty full name';
}; 

module.exports = (req, res) => {

    User.create(req.body).then(() => {
        res.json({ success: true });
    }).catch((error) => {
        res.json({ error });
    });

};
