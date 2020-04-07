const knex = require('knex');
//Volta duas pastas (../) para pegar o arquivo indicado
const configuration = require('../../knexfile'); 

const connection = knex(configuration.development);

module.exports = connection;