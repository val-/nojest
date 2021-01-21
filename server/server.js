const express = require('express');
const session = require('express-session');
const pg = require('pg');
const pgSession = require('connect-pg-simple')(session);
const path = require('path');

const port = 8080;
const apiRoutes = require('./api/routes');
const { connectionString } = require('./config/database');

const app = express();

app.use('/', express.static('./client/build'));

const pgPool = new pg.Pool({ connectionString });

app.use(session({
    store: new pgSession({
        pool: pgPool,
        tableName: 'nj_session',
    }),
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
