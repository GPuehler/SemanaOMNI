exports.up = function(knex) {
    return knex.schema.createTable('ongs', function (table) {
        table.string('id').primary(); //Primary Key tendo que adicionar manual
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf',2).notNullable();
    });
};

exports.down = function(knex) {
    knex.schema.dopTable('ongs');
};