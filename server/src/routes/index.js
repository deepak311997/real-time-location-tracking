const routes = require('express').Router();

const {startPublishing} = require('../controllers/location');

routes.post('/start', startPublishing);

module.exports = routes;
