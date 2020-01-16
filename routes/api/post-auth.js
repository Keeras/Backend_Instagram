var express = require('express');
var router = express.Router();


const post_controller =require('../../api_controller/post_controller');


// add post
router.post('/addPost',post_controller.addPost);
router.get('/post', post_controller.getPost);

router.get('/:id/post',post_controller.getPostById);

module.exports = router;