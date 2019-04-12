const Joi = require('joi');
const mongoose = require('mongoose');

const domainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Domain = mongoose.model('Domain', domainSchema);

function validateDomain(domain) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(domain, schema);
}

exports.domainSchema = domainSchema;
exports.Domain = Domain;
exports.validate = validateDomain;