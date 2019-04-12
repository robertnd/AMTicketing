//Author =: RG - Airtel HQ 
//Tracker for Airtel MN issues in KE {JIRA License expired}
//Suraj@Wipro to integrate to SingleView
//With Mongo cause why not? 
//Version 1.0 Beta

const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));