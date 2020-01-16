exports.up = async function(knex, Promise) {
    await knex.schema.hasTable('post_like')
    return await knex.schema.createTable('post_like', table=>{
        table.increments('post_like_id').primary();
        table.integer('post_id');
        table.integer('user_id');
        table.integer('post_like');

    });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('post_like')
};