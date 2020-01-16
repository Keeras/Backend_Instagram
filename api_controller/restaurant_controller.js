const knex = require('knex');
const config = require('../knexfile');
const md5 = require('md5');
var path = require('path');
const dbClient = knex(config);

var jwt = require('jsonwebtoken');
const tokenconfig = require('../config');


const multer = require('multer'); //to upload the image file
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/')
  },
  filename: (req, file, cb) => {
    // console.log(file.originalname);
    // console.log(file.fieldname);
    let ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
});
var upload = multer({ storage: storage }).single('imageFile');

function registerRestaurant(request, response) {

  const restaurantName = request.body.restaurant_name;
  const restaurantType = request.body.restaurant_type;
  const restaurantLocation = request.body.restaurant_location;
  const restaurantOpenHours = request.body.restaurant_open_hours;
  const restaurantServiceCharge = request.body.restaurant_service_charge;
  const restaurantAbout = request.body.restaurant_about;
  const restaurantProfileImage = request.body.restaurant_profile_image;
  const restaurantCoverImage = request.body.restaurant_cover_image;

console.log(restaurantName);
console.log(restaurantType);

  dbClient
    .table('restaurant')
    .insert({
      //this must be same for database's column
      restaurant_name: restaurantName,
      restaurant_type: restaurantType,
      restaurant_location: restaurantLocation,
      restaurant_open_hours: restaurantOpenHours,
      restaurant_service_charge: restaurantServiceCharge,
      restaurant_about: restaurantAbout,
      restaurant_profile_image: restaurantProfileImage,
      restaurant_cover_image: restaurantCoverImage

    })
    .then(data => {
      response.json({
        status: 'success',
        message: 'Restaurant Added'
      })
    })
    .catch(error => {
      console.log(error);
      response.json({
        status: 'fail',
        message: 'Failed, please try again'
      })
    })
}
function addCuisineCategory(request, response) {
  const cuisineCategoryName = request.body.cuisine_category_name;
  const cuisineCategoryDetails = request.body.cuisine_category_details;
  const cuisineRestaurantId = request.body.restaurant_id;
  const cuisineCategoryImage = request.body.category_image;

  console.log(cuisineCategoryName);
  console.log(cuisineCategoryDetails);
  console.log(cuisineRestaurantId);
  console.log(cuisineCategoryImage);
  dbClient
    .table('cuisine_category')
    .insert({
      cuisine_category_name: cuisineCategoryName,
      cuisine_category_details: cuisineCategoryDetails,
      restaurant_id: cuisineRestaurantId,
      category_image: cuisineCategoryImage
    })
    .then(data => {
      response.json({
        status: 'success',
        message: 'Cuisine category added',
        data: {
          cuisineCategoryName: cuisineCategoryName,
        }
      })
    })
    .catch(error => {
      console.log(error);
      response.json({
        status: 'fail',
        message: 'Failed'
      })
    })
}

function addCuisine(request, response) {
  const cuisineName = request.body.cuisine_name;
  const cuisinePrice = request.body.cuisine_price;
  const cuisineDescription = request.body.cuisine_description;
  const cuisineImage = request.body.cuisine_image;
  const cuisineCategoryId = request.body.cuisine_category_id;
  dbClient
    .table('cuisine')
    .insert({
      cuisine_name: cuisineName,
      cuisine_price: cuisinePrice,
      cuisine_description: cuisineDescription,
      cuisine_image: cuisineImage,
      cuisine_category_id: cuisineCategoryId
    }).then(data => {
      response.json({
        status: 'success'
      })
    })
    .catch(error => {
      console.log(error);
      response.json({
        status: 'fail',
      })
    })
}

//to upload image
function uploadImage(req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json(req.file);
  });

}


function getRestaurantById(req, res) {
  let restaurant_id = req.params.id;


  dbClient('restaurant')
    .select('*')
    .where('restaurant_id', '=', restaurant_id)

    .then(data => { //data aauncha
      console.log(data);
      let mapped = data.map(m => {
        return m;
      });
      console.log(mapped);
      data = Object.assign({}, ...mapped);
      res.json(data)
    })
    .catch(function (error) {
      console.log(error);
    });

}

function getCuisineByCategoryId(req, res) {
  let category_id = req.params.id;


  dbClient('cuisine')
    .select('*')
    .where('cuisine_category_id', '=', category_id)

    .then(data => { //data aauncha
     
      res.json(data)
    })
    .catch(function (error) {
      console.log(error);
    });

}

function getAllRestaurant(req, res) {

  dbClient('restaurant')
    .select('*')

    .then(data => { //data aauncha
      res.json(data)
    })
    .catch(function (error) {
      console.log(error);
    });

}

function getRestaurantCategory(req, res) {
  let restaurant_id = req.params.id;
  console.log(restaurant_id);

  dbClient('cuisine_category')
    .select('cuisine_category_id','cuisine_category_name','cuisine_category_details','category_image')
    .where({restaurant_id: restaurant_id})
 

    .then(data => { //data aauncha
      res.json(data)
    })
    .catch(function (error) {
      console.log(error);
    });
}
function getRestaurantCuisine(req, res) {
  let category_id = req.params.id;
  console.log(category_id);
  dbClient('cuisine')
    .select('cuisine_id', 'cuisine_name', 'cuisine_price', 'cuisine_description', 'cuisine_image', 'cuisine_category_id')
    .where({ cuisine_category_id: category_id })

    .then(data => { //data aauncha
      res.json(data)
    })
    .catch(function (error) {
      console.log(error);
    });
}
function restaurantImages(req, res) {
  restaurant_id = req.params.id;
  dbClient('restaurant_gallery')
    .select({
      postImage: 'restaurant_image'
    })
    .where('restaurant_id', restaurant_id)

    .then(data => { //data aauncha
      res.json(data)
    })
    .catch(function (error) {
      console.log(error);
    });

}
function deleteRestaurant(req, res) {
  restaurant_id = req.params.id;
  console.log(restaurant_id);
  dbClient('restaurant')

    .where('restaurant_id', restaurant_id)
    .del()
    .then(data => { //data aauncha
      res.json({
        success: 'true',
        status: 'success',
        message: 'Deleted Successfully'
      })
    })
    .catch(function (error) {
      console.log(error);
    });

}
function deleteCuisine(req, res) {
  cuisine_id = req.params.id;
  console.log(cuisine_id);
  dbClient('cuisine')

    .where('cuisine_id', cuisine_id)
    .del()
    .then(data => { //data aauncha
      res.json({
        success: 'true',
        status: 'success',
        message: 'Deleted Successfully'
      })
    })
    .catch(function (error) {
      console.log(error);
    });

}
function deleteCategory(req, res) {
  cuisine_category_id = req.params.id;

  dbClient('cuisine_category')
    .where('cuisine_category_id', cuisine_category_id)
    .del()
    .then(function (result) {
      res.json({
        success: 'true',
        status: 'success',
        message: 'Deleted Successfully'
      })
    })
    .catch(function (error) {
      console.log(error);
    });

}
module.exports = {
  'registerRestaurant': registerRestaurant,
  'addCuisineCategory': addCuisineCategory,
  'addCuisine': addCuisine,
  'getAllRestaurant': getAllRestaurant,
  'uploadImage': uploadImage,
  'getRestaurantCategory': getRestaurantCategory,
  'getRestaurantCuisine': getRestaurantCuisine,
  'restaurantImages': restaurantImages,
  'getRestaurantById': getRestaurantById,
  'deleteRestaurant': deleteRestaurant,
  'deleteCategory':deleteCategory,
  'deleteCuisine':deleteCuisine,
  'getCuisineByCategoryId':getCuisineByCategoryId

}