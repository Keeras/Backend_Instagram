

 exports.up = async function(knex, Promise) {
    await knex.schema.hasTable('post_review')
    return await knex.schema.createTable('post_review', table=>{
        table.increments('post_review_id').primary();
        table.integer('post_id');
        table.integer('user_id');
        table.string('post_comment');
    });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('post_review')
};
