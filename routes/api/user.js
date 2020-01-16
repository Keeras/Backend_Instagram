var express = require('express');
var router = express.Router();

const user=require('../../api_controller/user_controller');

// for register
router.post('/register',user.register);

//for login
router.post('/login',user.login);

module.exports = router;
