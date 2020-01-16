var express = require('express');
var router = express.Router();



const restaurant_controller =require('../../api_controller/restaurant_controller');


router.post('/upload',restaurant_controller.uploadImage);

router.get('/:id/restaurant-category',restaurant_controller.getRestaurantCategory);

router.get('/:id/restaurant-cuisine',restaurant_controller.getRestaurantCuisine);
router.get('/:id/restaurant',restaurant_controller.getRestaurantById);

module.exports = router;
