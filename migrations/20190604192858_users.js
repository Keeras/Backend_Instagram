
exports.up = async function(knex, Promise) {
    await knex.schema.hasTable('user')
    return await knex.schema.createTable('user', table=>{
        table.increments('user_id').primary();
        table.string('username');
        table.string('full_name');
        table.string('password');
        table.integer('phoneNumber');
        table.string('email');

        // later updated
        table.string('userImage');
        table.string('role');
    });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('user')
};
