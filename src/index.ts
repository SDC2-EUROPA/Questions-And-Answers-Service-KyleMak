const express = require('express');
const cors = require('cors');
require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
const router = require('./controllers/qaController');

app.use('/qa', router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports.app = app;
