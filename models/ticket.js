const Joi = require('joi');
const mongoose = require('mongoose');
const {domainSchema} = require('./domain');

const Ticket = mongoose.model('Tickets', new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 255
  },
  domain: { 
    type: domainSchema,  
    required: true
  },
  unresolvedCount: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  },
  ticketSLA: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  }
}));

function validateTicket(ticket) {
  const schema = {
    description: Joi.string().min(5).max(50).required(),
    domainId: Joi.objectId().required(),
    unresolvedCount: Joi.number().min(0).required(),
    ticketSLA: Joi.number().min(0).required()
  };

  return Joi.validate(ticket, schema);
}

exports.Ticket = Ticket; 
exports.validate = validateTicket;