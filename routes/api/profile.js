var express = require('express');
var router = express.Router();

const profile_controller = require('../../api_controller/profile_controller');
//for post images
router.get('/:id/postImage',profile_controller.postImages)

// get own post
router.get('/:id/post',profile_controller.getOwnPost);
router.get('/:id/post',profile_controller.getOwnPost);
router.put('/:id/edit-email',profile_controller.editEmail);
router.put('/:id/edit-phoneNumber',profile_controller.editPhoneNumber);
router.put('/:id/edit-password',profile_controller.editPassword);

module.exports = router;
