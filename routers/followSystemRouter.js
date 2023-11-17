const express = require('express');
const router = express.Router();

const followController = require('../controllers/followSystemController');

router.put("/:id/followUnfollow",followController.follow_Unfollow);

module.exports = router;