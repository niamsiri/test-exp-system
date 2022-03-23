const express = require("express");
const app = express();

app.use('/book', require('./books'))
app.use('/images', require('./images'))

module.exports = app;
