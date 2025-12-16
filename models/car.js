import joi from 'joi';

const carSchema = joi.object({
  id: joi.string().required(),
  model_name: joi.string().required(),
  license_plate: joi.string().required(),
  rent_price: joi.number().required(),
  available: joi.boolean().required()
});

export default carSchema;
