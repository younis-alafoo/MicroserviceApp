// models/car.js
// Joi schema definition for Car resource.
// Validate incoming car data before saving or updating.
// Ensure fields have correct types and constraints.
// Provide meaningful error messages on validation failure.

import Joi from 'joi';

const carSchema = Joi.object({
  
  // Unique identifier for the car
  id: Joi.string().required().messages({'string.empty': "Car 'id' is required."}),
  
  // Model name of the car (e.g., 'Toyota Corolla').
  model_name: Joi.string().min(2).max(50).required().messages({
      'string.empty': "Car 'model_name' is required.",
      'string.min': "Car 'model_name' must be at least 2 characters long.",
      'string.max': "Car 'model_name' must not exceed 50 characters."
    }),

  // License plate number of the car (1–10 characters, uppercase letters, numbers, or dashes).
  license_plate: Joi.string().pattern(/^[A-Z0-9-]{1,10}$/).required().messages({
      'string.empty': "Car 'license_plate' is required.",
      'string.pattern.base': "Car 'license_plate' must be 1-10 characters long and contain only uppercase letters, numbers, or dashes."
    }),

  // Rental price per day for the car (positive number).
  rent_price: Joi.number().positive().precision(3).required().messages({
      'number.base': "Car 'rent_price' must be a number.",
      'number.positive': "Car 'rent_price' must be a positive number and allow 3 decimals.",
      'any.required': "Car 'rent_price' is required."
    }), 

  // Availability status of the car for rent (true if available, false otherwise).
  available: Joi.boolean().required().messages({
    'boolean.base': "Car 'available' must be true or false.",
    'any.required': "Car 'available' status is required."
  }),


  // Auto-managed timestamps (set internally by controllers)
  created_at: Joi.string().optional(),
  updated_at: Joi.string().optional()

});

export default carSchema;
