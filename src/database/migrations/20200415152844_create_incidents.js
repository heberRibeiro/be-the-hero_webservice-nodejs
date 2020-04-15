/*
 * Reference http://knexjs.org/#Migrations
 * Command to create a migration: npx knex migrate:make name_of_migration
 * Command to running a migration: npx knex migrate:latest * 
 */
exports.up = function(knex) {

    return knex.schema.createTable('incidents', function (table) {
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable();

        table.foreign('ong_id').references('id').inTable('ongs');
     })
  
};

exports.down = function(knex) {

    return knex.schema.dropTable('incidents');
  
};
