const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

/** 
 * Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação);
 * Route Params: Parâmetros utilizados para identificar recursos;
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos;
*/

//ONGS
routes.get('/ongs', OngController.index);
routes.post('/ongs',OngController.create);

//INCIDENTS
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
//O ":id" serve como parametro no WHERE do delete
routes.delete('/incidents/:id', IncidentController.delete);

//Pesquisa única de incidente
routes.get('/profile', ProfileController.index);

//SESSIONS
routes.post('/sessions', SessionController.create);

module.exports = routes;