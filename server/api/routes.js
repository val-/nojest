const router = require('express').Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const registration = require('./handlers/registration');
const activation = require('./handlers/activation');

router.post('/registration', jsonParser, registration);
router.post('/activation', jsonParser, activation);

module.exports = router;
