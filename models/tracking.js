const Joi = require('joi');
const mongoose = require('mongoose');

const Tracking = mongoose.model('Tracking', new mongoose.Schema({
  customer: { 
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      currentStatus: {
        type: Boolean,
        default: false
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      }      
    }),  
    required: true
  },
  ticket: {
    type: new mongoose.Schema({
      description: {
        type: String,
        required: true,
        trim: true, 
        minlength: 5,
        maxlength: 255
      },
      ticketSLA: { 
        type: Number, 
        required: true,
        min: 0,
        max: 255
      }   
    }),
    required: true
  },
  dateOccurred: { 
    type: Date, 
    required: true,
    default: Date.now
  },
  dateResolved: { 
    type: Date
  },
  resolutionTime: { 
    type: Number, 
    min: 0
  }
}));

function validateTracking(tracking) {
  const schema = {
    customerId: Joi.objectId().required(),
    ticketId: Joi.objectId().required()
  };

  return Joi.validate(tracking, schema);
}

exports.Tracking = Tracking; 
exports.validate = validateTracking;