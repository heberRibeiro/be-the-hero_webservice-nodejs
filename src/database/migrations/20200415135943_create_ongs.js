/*
 * Reference http://knexjs.org/#Migrations
 * Command to create a migration: npx knex migrate:make name_of_migration
 * Command to running a migration: npx knex migrate:latest * 
 */
exports.up = function(knex) {

    return knex.schema.createTable('ongs', function (table) {
       table.string('id').primary();
       table.string('name').notNullable();
       table.string('email').notNullable();
       table.string('whatsapp').notNullable();
       table.string('city').notNullable();
       table.string('uf', 2).notNullable();       
    })
      
};

exports.down = function(knex) {

  return knex.schema.dropTable("ongs");

};
