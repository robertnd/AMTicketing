const { Tracking, validate } = require('../models/tracking');
const { Ticket } = require('../models/ticket');
const { Customer } = require('../models/customer');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req, res) => {
  const trackings = await Tracking.find().sort('-dateOccurred');
  res.send(trackings);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const ticket = await Ticket.findById(req.body.ticketId);
  if (!ticket) return res.status(400).send('Invalid ticket.');

  if (ticket.unresolvedCount === 0) return res.status(400).send('Ticket not found.');

  let tracking = new Tracking({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    ticket: {
      _id: ticket._id,
      description: ticket.description,
      ticketSLA: ticket.ticketSLA
    }
  });

  try {
    new Fawn.Task()
      .save('trackings', tracking)
      .update('tickets', { _id: ticket._id }, {
        $inc: { unresolvedCount: -1 }
      })
      .run();

    res.send(tracking);
  }
  catch (ex) {
    res.status(500).send('Something failed.');
  }
});

router.get('/:id', async (req, res) => {
  const tracking = await Tracking.findById(req.params.id);

  if (!tracking) return res.status(404).send('The tracking with the given ID was not found.');

  res.send(tracking);
});

module.exports = router; 