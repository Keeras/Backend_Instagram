const knex = require('knex');
const config = require('../knexfile');

var path = require('path');
const dbClient = knex(config);


function getComment(req, res) {
    let post_id = req.params.id;
   dbClient({ a: 'user', b: 'post_review',  })
      .select({
        post_comment: 'b.post_comment',
        username: 'a.full_name',
        userImage: 'a.userImage'
      })
      .where('post_id', post_id)
      .whereRaw('?? = ??', ['a.user_id', 'b.user_id'])
  
      .then(data => { //data aauncha
        res.json(data)

      })
      .catch(function (error) {
        console.log(error);
      });
  
      
  
  }

  function comment(request,response){
    const postId = request.body.post_id;
    const userId = request.body.user_id;
    const postComment = request.body.post_comment;
    dbClient
        .table('post_review')
        .insert({
          //this must be same for database's column
          post_id: postId,
          user_id: userId,
         post_comment: postComment
        })
        .then(data => {
          response.json({
            success: 'true',
            status: 'success',
            data: {
              
            }
          })
        })
        .catch(error => {
          console.log(error);
          response.json({
            success: 'fail',
            status: 'fail',
          })
        })

  }


   function like(request,response){
    const postId = request.body.post_id;
    const postLike = request.body.post_like;
    const userId = request.body.user_id;
    console.log(postId);
    dbClient
        .table('post_like')
        .insert({
          //this must be same for database's column
          post_id: postId,
          user_id: userId,
         post_like: postLike
        })
        .then(data => {
          response.json({
            success: 'true',
            status: 'success',
            data: {
              
            }
          })
        })
        .catch(error => {
          console.log(error);
          response.json({
            success: 'fail',
            status: 'fail',
          })
        })

  }
  

module.exports = {
    'getComment': getComment,
    'comment': comment,
    'like':like  
  }