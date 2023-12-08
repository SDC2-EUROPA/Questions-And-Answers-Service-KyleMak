import { Router } from 'express';

require('./db');
require('./logic/answersLogic');

const express = require('express');

const app = express();
const port = process.env.DB_PORT || 3000;
app.use(express.json());
// app.use('/qa', router);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports.app = app;
