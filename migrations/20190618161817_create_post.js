exports.up = async function(knex, Promise) {
    await knex.schema.hasTable('post')
    return await knex.schema.createTable('post', table=>{
        table.increments('post_id').primary();
        table.integer('poster_id');
        table.string('caption');
        table.string('location');
        table.date('time');
        table.string('postImage');
        table.string('poster_type');
        table.string('poster_name');
        table.string('poster_image')

    });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('post')
};