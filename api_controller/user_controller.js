const knex = require('knex');
const config = require('../knexfile');
const md5 = require('md5');

const dbClient = knex(config);

var jwt = require('jsonwebtoken');
const tokenconfig = require('../config');

function login(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let pwd = md5(password);


  dbClient('user').where({ username: username })
    .select('password', 'userImage', 'phoneNumber', 'email', 'full_name', 'user_id', 'role','username')
    .then(function (result) {
      if (!result || !result[0]) {
        return res.json({
          success: 'false',
          message: 'Invalid Username'
        });
      }
      var pass = result[0].password;
      if (pwd === pass) {
        let token = jwt.sign({ username: username },
          tokenconfig.secret,
          {
            expiresIn: '24h' // expires in 24 hours
          }
        );
        // return the JWT token for the future API calls
        return res.json({
          token: token,
          success: 'true',
          user_id: result[0].user_id,
          email: result[0].email,
          userImage: result[0].userImage,
          phoneNumber: result[0].phoneNumber,
          username: result[0].username,
          full_name: result[0].full_name,
          role: result[0].role,
        });
      } else {
        return res.json({
          success: 'false',
          message: 'Incorrect password'
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function register(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let fullName = req.body.full_name;
  let phoneNumber = req.body.phoneNumber;
  let email = req.body.email;
  let userImage = req.body.userImage;

  let pwd = md5(password);


  dbClient('user').where({ username: username  })
    .select('username')
    .then(function (result) {
      // checking if users is registered or not
      // if user is not registered then only allow to register
      if (!result || !result[0]) {

        dbClient
          .table('user')
          .insert({
            //this must be same for database's column
            username: username,
            password: pwd,
            full_name: fullName,
            phoneNumber: phoneNumber,
            email: email,
            userImage: userImage
          })
          .then(data => {
            res.json({
              success: 'true',
              status: 'success',
              message: 'successfully registered'
            })
          })
          .catch(error => {
            console.log(error);
            res.json({
              success: 'false',
              status: 'fail',
              message: 'Registration failed'
            })
          })
      }
      else {
        return res.json({
          status: 'fail',
          message: 'Email already exists!'
        })
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
module.exports = {
  'register': register,
  'login': login
}