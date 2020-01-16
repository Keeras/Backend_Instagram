const dbConfig = require('./knexfile');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('knex');
const dbClient= knex(dbConfig)  

// async function getUser(request, response){

//   const data = await dbClient.from('user').select('username');
//   response.json({
//     status: 'success',
//     data: data
//   })

// }

// async function getUserDetails(request,response){
//   const username = request.params.username;
//   const user = await dbClient.table('user').first('email','phoneNumber').where('username', username);

//   response.json({
//     data: user
//   })
// }

async function getUsername(req,res){
  const username = req.params.username;
  const user = await getUserDetails(username);

  res.json({
    data:user
  })
}
async function getUserDetails(username){
  const user = await dbClient.table('user').first('email','phoneNumber').where('username', username);
  return user;
}
async function login(request, response) {
  
  const email = request.body.email;
  const passwordFromJSON = request.body.password;

  const data = await dbClient.table('user').first('password').where('email', email);
  if (!data) {
    response.json({
      status: 'fail',
      message: 'User not found'
    })
  } else {
    const password = data.password;
    const isMatch = bcrypt.compareSync(passwordFromJSON, password);
    if (isMatch) {
      // password matched
      response.json({
        status: 'success',
        accessToken: jwt.sign({
          email: email
        }, SECRET_KEY)
      })
   } else {
     response.json({
       status: 'fail',
       message:'not matched password',
     })
   }
  } 
}



  function registerRestaurant(request, response) {
 
    const restaurantName = request.body.restaurantName;
    const restaurantType = request.body.restaurantType;
    const restaurantLocation = request.body.restaurantLocation;
    const restaurantOpenHours = request.body.restaurantOpenHours;
    const restaurantServiceCharge = request.body.restaurantServiceCharge;
    const restaurantAbout = request.body.restaurantAbout;
console.log("SUman");
    
    dbClient
      .table('restaurant')
      .insert({
        //this must be same for database's column
        restaurant_name: restaurantName,
        restaurant_type: restaurantType,
        restaurant_location: restaurantLocation,
        restaurant_open_hours: restaurantOpenHours,
        restaurant_service_charge: restaurantServiceCharge,
        restaurant_about: restaurantAbout
      })
      .then(data => {
        response.json({
          status: 'success',
          data: {
            restaurantName: restaurantName,
          }
        })
      })
      .catch(error => {
        console.log(error);
        response.json({
          status: 'fail',
        })
      })
  }
  function addCuisineCategory(request,response){
      const cuisineCategoryName = request.body.cuisineCategoryName;
      const cuisineCategoryNoOfItem = request.body.cuisineCategoryNoOfItem;
      const cuisineCategoryDetails = request.body.cuisineCategoryDetails;
      const cuisineCategoryReview = request.body.cuisineCategoryReview;
    
      dbClient
      .table('cuisine_category')
      .insert({
          cuisine_category_name : cuisineCategoryName,
          cuisine_category_no_of_item : cuisineCategoryNoOfItem,
          cuisine_category_details : cuisineCategoryDetails,
          cuisine_category_review : cuisineCategoryReview,
      })
      .then(data =>{
          response.json({
              status: 'success',
              data:{
                  cuisineCategoryName: cuisineCategoryName,
              }
          })
      })
      .catch(error => {
          console.log(error);
          response.json({
              status: 'fail',
          })
      })
    }
  function addCuisine(request, response){
      const cuisineName = request.body.cuisineName;
      const cuisinePrice = request.body.cuisinePrice;
      const cuisineDescription = request.body.cuisineDescription;
      const cuisineImage = request.body.cuisineImage;

      dbClient
      .table('cuisine')
      .insert({
          cuisine_name : cuisineName,
          cuisine_price : cuisinePrice,
          cuisine_description : cuisineDescription,
          cuisine_image : cuisineImage
      }).then(data => {
          response.json({
              status: 'success',
              data: {
                  cuisine: cuisineName,
              }
          })
      })
      .catch(error => {
          console.log(error);
          response.json({
              status: 'fail',
          })
      })
  }

    function addPost(request,response){
      const caption = request.body.caption;
console.log(caption);
      dbClient
          .table('post')
          .insert({
            //this must be same for database's column
            caption: caption,
            location: "default",
           user_id: "user_id"
          })
          .then(data => {
            response.json({
              success: 'true',
              status: 'success',
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
            })
          })

    }

   function registerUser(request, response) {
 
        const username = request.body.username;
        const password = request.body.password;
        const fullName = request.body.fullName;
        const email = request.body.email;
        const phoneNumber = request.body.phoneNumber;
     

        const hashedPassword = bcrypt.hashSync(password, 10);
        dbClient
          .table('user')
          .insert({
            //this must be same for database's column
            username: username,
            password: hashedPassword,
            full_name: fullName,
            email: email,
            phoneNumber: phoneNumber
          })
          .then(data => {
            response.json({
              success: 'true',
              status: 'success',
              data: {
                username: username,
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
        login : login,
        registerRestaurant : registerRestaurant,
        addCuisineCategory : addCuisineCategory,
        addCuisine : addCuisine,
        registerUser: registerUser,
        getUserDetails: getUserDetails,
        getUsername: getUsername,
        addPost: addPost
    };