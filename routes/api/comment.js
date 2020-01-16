var express = require('express');
var router = express.Router();



const comment_controller =require('../../api_controller/comment_controller');


// get comment
router.get('/:id/comment',comment_controller.getComment);
module.exports = router;

