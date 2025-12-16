function getAllCars(req, res) {
  res.send(
    '🤖 Cars Route with GET method - this endpoint will get all of the cars from the database'
  );
}

function createCar(req, res) {
  res.send(
    '🤖 Cars Route with POST method - this endpoint will create a new car in the database'
  );
}

function getCarById(req, res) {
  const carId = req.params.id;
  res.send(
    '🤖 Cars Route with GET method - this endpoint will get a single car by ID from the database. The car is: ' +
      carId
  );
}

function updateCarById(req, res) {
  const carId = req.params.id;
  res.send(
    '🤖 Cars Route with PUT method - this endpoint will update a single car by ID from the database. The car is: ' +
      carId
  );
}

function deleteCarById(req, res) {
  const carId = req.params.id;
  res.send(
    '🤖 Cars Route with DELETE method - this endpoint will delete a single car by ID from the database. The car is: ' +
      carId
  );
}

export default {
  getAllCars,
  createCar,
  getCarById,
  updateCarById,
  deleteCarById,
};