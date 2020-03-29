const { Router } = require('express');
const OngController = require('./controllers/ongController');
const IncidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const routes = new Router();
routes.post('/sessions', sessionController.create)

routes.get('/ongs', OngController.index);

routes.get('/profile', profileController.index);

routes.post('/ongs', OngController.create);

routes.post('/incidents', IncidentController.create);

routes.get('/incidents', IncidentController.index);

routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;