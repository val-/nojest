const express = require('express');
const port = 3000;

const app = express();

app.use(express.static('./client/build'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
