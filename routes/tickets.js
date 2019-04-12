const {Ticket, validate} = require('../models/ticket'); 
const {Domain} = require('../models/domain');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const tickets = await Ticket.find().sort('name');
  res.send(tickets);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const domain = await Domain.findById(req.body.domainId);
  if (!domain) return res.status(400).send('Invalid domain.');

  const ticket = new Ticket({ 
    description: req.body.description,
    domain: {
      _id: domain._id,
      name: domain.name
    },
    unresolvedCount: req.body.unresolvedCount,
    ticketSLA: req.body.ticketSLA
  });
  await ticket.save();
  
  res.send(ticket);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const domain = await Domain.findById(req.body.domainId);
  if (!domain) return res.status(400).send('Invalid domain.');

  const ticket = await Ticket.findByIdAndUpdate(req.params.id,
    { 
      description: req.body.description,
      domain: {
        _id: domain._id,
        name: domain.name
      },
      unresolvedCount: req.body.unresolvedCount,
      ticketSLA: req.body.ticketSLA
    }, { new: true });

  if (!ticket) return res.status(404).send('The ticket with the given ID was not found.');
  
  res.send(ticket);
});

router.delete('/:id', async (req, res) => {
  const ticket = await Ticket.findByIdAndRemove(req.params.id);

  if (!ticket) return res.status(404).send('The ticket with the given ID was not found.');

  res.send(ticket);
});

router.get('/:id', async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) return res.status(404).send('The ticket with the given ID was not found.');

  res.send(ticket);
});

module.exports = router; 