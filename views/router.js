import express from 'express';

const Router = express.Router();

Router.route('/cars')
  .get((req, res) => {
    res.send(
      '🤖 Cars Route with GET method - this endpoint will get all of the cars from the database'
    );
  })
  .post((req, res) => {
    res.send(
      '🤖 Cars Route with POST method - this endpoint will create a new car in the database'
    );
  });

export default Router;
