
const express = require('express');
const logger = require('morgan');
const cors = require("cors");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload")
const mongoose = require("mongoose")

mongoose.Promise = require("bluebird")

mongoose.connect("mongodb://mongodb:27017/testdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET, HEAD, PUT, POST, DELETE,OPTIONS",
    optionSuccessStatus: 200,
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

app.use('/', require('./routes'));

module.exports = app;
