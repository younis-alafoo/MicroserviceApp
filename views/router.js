import express from 'express';
import carsController from '../controllers/carsController.js';

const Router = express.Router();

Router.route('/cars')
  .get(carsController.getAllCars)
  .post(carsController.createCar);

Router.route('/cars/:id')
  .get(carsController.getCarById)
  .put(carsController.updateCarById)
  .delete(carsController.deleteCarById);

export default Router;
