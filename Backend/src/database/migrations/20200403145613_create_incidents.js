exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments(); //Auto incrementável

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable(); //Foreign Key da tabela ONG

        table.foreign('ong_id').references('id').inTable('ongs');//Faz o vínculo
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
