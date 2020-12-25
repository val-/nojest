const express = require('express');
const session = require('express-session');
const path = require('path');

const port = 8080;
const apiRoutes = require('./api/routes');

const app = express();

app.use('/', express.static('./client/build'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));

app.use('/api', apiRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + './../client/build/index.html'));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
