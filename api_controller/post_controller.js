const knex = require('knex');
const config = require('../knexfile');

const dbClient = knex(config);

function addPost(request, response) {
  const caption = request.body.caption;
  const postImage = request.body.postImage;
  const username = request.body.username;
  const userImage = request.body.userImage;
 

  console.log(userImage);
  console.log(username);
  dbClient
    .table('post')
    .insert({
      //this must be same for database's column
      caption: caption,
      postImage: postImage,
      username: username,
      userImage: userImage,
   

    })
    .then(data => {
      response.json({
        success: 'true',
        status: 'success',
        message: 'Post Added',
        data: {
          caption: caption,
        }
      })
    })
    .catch(error => {
      console.log(error);
      response.json({
        success: 'fail',
        status: 'fail',
        message: 'Post Failed',
      })
    })

}



function tag(request, response) {
  const postId = request.body.post_id;
  const tagUserId = request.body.tag_user_id;

  dbClient
    .table('post_tag')
    .insert({
      //this must be same for database's column
      post_id: postId,
      tag_user_id: tagUserId
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

function getPost(req, res) {

  dbClient('post')
    .select({
      caption: 'caption',
      postImage: 'postImage',
      username: 'username',
      userImage: 'userImage',
    })
    .then(data => { //data aauncha
      res.json(data)
    })
    .catch(function (error) {
      console.log(error);
    });

}
function getPostById(req, res) {
 const post_id = req.params.id;

  dbClient('post')
    .select({
      caption: 'caption',
      location: 'location',
      time: 'time',
      poster_name: 'poster_name',
      postImage: 'postImage',
      post_id: 'post_id',
      poster_image: 'poster_image',
      poster_type: 'poster_type'
    })
    .where({post_id: post_id})
    .then(data => { //data aauncha
     

    
      let mapped=data.map(m=>{
        return m;
      });
       data=Object.assign({},...mapped);
      res.json(data)
    })
    .catch(function (error) {
      console.log(error);
    });

}

module.exports = {
  'addPost': addPost,
  'tag': tag,
  'getPost': getPost,
  'getPostById':getPostById
}