const connection = require('../database/connection');

module.exports = {
    async index(request,response) {
        //Usado pra pegar a página da requisição
        //Ex: se colocar na requisição ?page=2, ele vai trazer a página conforme o select abaixo
        const {page = 1} = request.query;
        //Faz o select no banco
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5) //Página começa do zero, diminui pra ir multiplicando por 5
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        const [count] = await connection('incidents').count();
        console.log(count);

        //Pra paginação, utilizar o header abaixo como abaixo pra trazer o total da página.
        response.header('X-Total-Count', count['count(*)']);

        //Retorna um array
        response.json(incidents);
    },

    async create(request,response) {
        //Pega as informações do body da requisição (request)
        const { title, description, value } = request.body;
        //Header da FK colocado no Insomnia
        const ong_id = request.headers.authorization;
        //Insere na tabela
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        return response.json({id});
    },

    async delete(request,response) {
        //Vai usar o ID repassado na requisição (Ex: incidents/2)
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted'});
        }
        await connection('incidents').where('id',id).delete();

        return response.status(204).send();
    }
}