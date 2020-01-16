var express = require('express');
var router = express.Router();



const comment_controller =require('../../api_controller/comment_controller');


// add review
router.post('/addcomment', comment_controller.comment);

//like
router.post('/like',comment_controller.like);

module.exports = router;