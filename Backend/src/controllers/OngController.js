const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    async index(request,response) {
        //Faz o select no banco
        const ongs = await connection('ongs').select('*');
        //Retorna um array
        return response.json(ongs);
    },
    
    async create(request, response) {
        //Pega as informações do body da requisição (request)
        const { name, email, whatsapp, city, uf} = request.body;
        //Criando o ID randomico em hexadecimal (4 caracteres e convertio em String)
        const id = crypto.randomBytes(4).toString('HEX'); 

        //Com o await, o sistema vai aguardar terminar o insert abaixo (async lá em cima)
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });
        return response.json({id});
    }
}