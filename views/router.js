// views/router.js
// Defines all routes for the Cars resource.
// Map HTTP methods and endpoints to controller functions.
// Validate incoming request parameters before reaching controllers.
// Provide clear error messages when input is invalid.


import express from 'express';
import carsController from '../controllers/carsController.js';

const Router = express.Router();

Router.route('/cars')
  .get(carsController.getAllCars)   //Retrieve all cars
  .post(carsController.createCar);  //Create a new car

Router.route('/cars/:id')
  .get(carsController.getCarById)         //Retrieve a car by ID
  .put(carsController.updateCarById)      //Update a car by ID
  .delete(carsController.deleteCarById);  //Delete a car by ID

export default Router;