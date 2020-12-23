const router = require('express').Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const registration = require('./handlers/registration');

router.post('/registration', jsonParser, registration);

module.exports = router;
