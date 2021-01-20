const router = require('express').Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const sessionContext = require('./handlers/sessionContext');
const login = require('./handlers/login');
const logout = require('./handlers/logout');
const registration = require('./handlers/registration');
const activation = require('./handlers/activation');
const updateProfile = require('./handlers/updateProfile');

router.get('/session-context', jsonParser, sessionContext);
router.post('/login', jsonParser, login);
router.get('/logout', logout);
router.post('/registration', jsonParser, registration);
router.post('/activation', jsonParser, activation);
router.post('/update-profile', jsonParser, updateProfile);

module.exports = router;
