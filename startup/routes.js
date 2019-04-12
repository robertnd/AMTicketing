const express = require('express');
const domains = require('../routes/domains');
const customers = require('../routes/customers');
const tickets = require('../routes/tickets');
const trackings = require('../routes/tracking');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/domains', domains);
  app.use('/api/customers', customers);
  app.use('/api/tickets', tickets);
  app.use('/api/trackings', trackings);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use(error);
}