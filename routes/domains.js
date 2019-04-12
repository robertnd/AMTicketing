const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Domain, validate} = require('../models/domain');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const domains = await Domain.find().sort('name');
  res.send(domains);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let domain = new Domain({ name: req.body.name });
  domain = await domain.save();
  
  res.send(domain);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const domain = await Domain.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!domain) return res.status(404).send('The domain with the given ID was not found.');
  
  res.send(domain);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const domain = await Domain.findByIdAndRemove(req.params.id);

  if (!domain) return res.status(404).send('The domain with the given ID was not found.');

  res.send(domain);
});

router.get('/:id', async (req, res) => {
  const domain = await Domain.findById(req.params.id);

  if (!domain) return res.status(404).send('The domain with the given ID was not found.');

  res.send(domain);
});

module.exports = router;