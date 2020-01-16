var express = require('express');
var router = express.Router();


const post_controller =require('../../api_controller/post_controller');




router.get('/post',post_controller.getPost);

// get Postby id

router.get('/:id/post',post_controller.getPostById);
// tag
router.post('/tag',post_controller.tag);
module.exports = router;
