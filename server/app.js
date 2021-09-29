"use strict";

const express = require("express");
const morganLog = require("morgan");
const cors = require('cors');

const personenRouter = require('./routes/personenRouter');
const carRouter = require('./routes/carRouter');

const app = express();

app.use(morganLog("dev"));

app.options('/api', cors());
app.use("/api",cors({ origin: '*' }));

app.use(express.static("public"));

app.use("/api/personen", personenRouter);
app.use("/api/cars", carRouter);

module.exports = app;

