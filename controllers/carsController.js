// carsController.js
// Controller functions for managing Car resources in DynamoDB.
// Handle CRUD operations (Create, Read, Update, Delete).
// Validate input using Joi schema before database operations.
// Return clear error messages when input or operations fail.


import database from '../services/database.js';
import {
  ScanCommand,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb';

import { v4 as uuidv4 } from 'uuid';
import carSchema from '../models/car.js';

// GET /cars -- Retrieves all cars from the Cars table.
async function getAllCars(req, res, next) {
  try {
    const params = {
      TableName: 'Cars',
    };
    const command = new ScanCommand(params);
    const result = await database.send(command);
    
    res.status(200).json(result.Items);
  } catch (err) {
    console.error("❌ Failed to fetch cars:", err);
    next(err);
  }
}

// POST /cars -- Creates a new car entry after validating input.
async function createCar(req, res, next) {
  try {
    const uuid = uuidv4();  // Generate unique ID for new car
    const now = new Date().toISOString();

    req.body.id = uuid;
    req.body.created_at = now;
    req.body.updated_at = now;

    const { error, value } = carSchema.validate(req.body);  // Validate request body against schema

    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { id, model_name, license_plate, rent_price, available, created_at, updated_at } = value;

    const params = {
      TableName: 'Cars',
      Item: {
        id,
        model_name,
        license_plate,
        rent_price,
        available,
        created_at,
        updated_at
      },
    };

    const command = new PutCommand(params);
    await database.send(command);

    res
      .status(201)
      .json({ message: '✅ Successfully created car', data: params.Item });
  } catch (error) {
    console.error("❌ Failed to create car:", error);
    next(error);
  }
}

// GET /cars/:id -- Retrieves a car by its ID.
async function getCarById(req, res, next) {
  const carId = req.params.id;
  try {
    const params = {
      TableName: 'Cars',
      Key: { id: carId },
    };
    const command = new GetCommand(params);
    const result = await database.send(command);
    if (!result.Item) {
      return res.status(404).json({ error: `No car found with id '${carId}'.` });
    }
    res.status(200).json(result.Item);
  } catch (err) {
    next(err);
  }
}

// PUT /cars/:id -- Updates a car by its ID after validating input.
async function updateCarById(req, res) {
  try {
    const carId = req.params.id;
    const now = new Date().toISOString();

    req.body.id = carId;
    req.body.updated_at = now;

    // Validate request body
    const { error, value } = carSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { model_name, license_plate, rent_price, available, updated_at} = value;

    // Get the car from DynamoDB
    const getParams = {
      TableName: 'Cars',
      Key: { id: carId },
    };

    const getCommand = new GetCommand(getParams);
    const result = await database.send(getCommand);

    const car = result.Item;

    if (!car) {
      return res.status(404).json({ message: `No car found with id '${carId}'.`
 });
    }

    // Update the car in DynamoDB
    const updateParams = {
      TableName: 'Cars',
      Key: { id: carId },
      UpdateExpression:
        'set #model_name = :model_name, #license_plate = :license_plate, #rent_price = :rent_price, #available = :available, #updated_at = :updated_at',
      ExpressionAttributeNames: {
        '#model_name': 'model_name',
        '#license_plate': 'license_plate',
        '#rent_price': 'rent_price',
        '#available': 'available',
        '#updated_at': 'updated_at',
      },
      ExpressionAttributeValues: {
        ':model_name': model_name,
        ':license_plate': license_plate,
        ':rent_price': rent_price,
        ':available': available,
        ':updated_at': updated_at,
      },
      ReturnValues: 'ALL_NEW',
    };
    const updateCommand = new UpdateCommand(updateParams);
    const updatedCar = await database.send(updateCommand);

    res.status(200).json({
      message: '✅ Car updated successfully',
      data: updatedCar.Attributes
    });

  } catch (err) {
    console.error("❌ Failed to update car:", err);
    next(err);
  }
}

// DELETE /cars/:id -- Deletes a car by its ID.
async function deleteCarById(req, res) {
  const carId = req.params.id;
  try {
    const params = {
      TableName: 'Cars',
      Key: { id: carId },
    };
    const command = new DeleteCommand(params);
    await database.send(command);

    res.status(200).json({
      message: `✅ Car with id '${carId}' deleted successfully`
  });
  } catch (err) {
    next(err);
  }
}

export default {
  getAllCars,
  createCar,
  getCarById,
  updateCarById,
  deleteCarById,
};