const express = require('express');

const port = 3000;
const apiRoutes = require('./api/routes');

const app = express();

app.use('/', express.static('./client/build'));
app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
