const knex = require('knex');
const config = require('../knexfile');
const md5 = require('md5');


const dbClient = knex(config);



function postImages(req, res) {
    user_id = req.params.id;
    console.log(user_id);
    dbClient({ a: 'post', b: 'user' })
      .select({
        postImage: 'a.postImage'
      })
      .where('b.user_id', user_id)
      .whereRaw('?? = ??', ['a.poster_id', 'b.user_id'])
  
      .then(data => { //data aauncha
        res.json(data)
      })
      .catch(function (error) {
        console.log(error);
      });
  
  }

  
function getOwnPost(req, res) {
    poster_id = req.params.id;
  
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
      .where('poster_id', poster_id)
      .where('poster_type', 'user')
      .then(data => { //data aauncha
        res.json(data)
      })
      .catch(function (error) {
        console.log(error);
      });
  
  }

  function editEmail(req, res) {
  let user_id = req.params.id;
  let password = req.body.password;
  let email = req.body.email;
    let pwd = md5(password);

    dbClient('user')
    .where('user_id', user_id)
    .where('password',pwd)
    .update('email',email)
    .then(data => {
      res.json({
        success: 'true',
        status: 'success'
      })
    })
      .catch(function (error) {
        console.log(error);
        res.json({
          success: 'fail',
          status: 'fail',
        })
      });
  
  }
  
  function editPassword(req, res) {
    let user_id = req.params.id;
    let password = req.body.password;
    let newPassword = req.body.newPassword;
      let pwd = md5(password);
      let newPwd = md5(newPassword);
  
      dbClient('user')
      .where('user_id', user_id)
      .where('password',pwd)
      .update('password',newPwd)
      .then(data => {
        res.json({
          success: 'true',
          status: 'success'
        })
      })
        .catch(function (error) {
          console.log(error);
          res.json({
            success: 'fail',
            status: 'fail',
          })
        });
    
    }
    function editPhoneNumber(req, res) {
      let user_id = req.params.id;
      let password = req.body.password;
      let phoneNumber = req.body.phoneNumber;
        let pwd = md5(password);
    console.log(phoneNumber);
        dbClient('user')
        .where('user_id', user_id)
        .where('password',pwd)
        .update('phoneNumber',phoneNumber)
        .then(data => {
          res.json({
            success: 'true',
            status: 'success'
          })
        })
          .catch(function (error) {
            console.log(error);
            res.json({
              success: 'fail',
              status: 'fail',
            })
          });
      
      }
  module.exports = {
    'postImages': postImages,
    'getOwnPost': getOwnPost,
    "editEmail":editEmail,
    'editPhoneNumber':editPhoneNumber,
    'editPassword':editPassword
  }
  