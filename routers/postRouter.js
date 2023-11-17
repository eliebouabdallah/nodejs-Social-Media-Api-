const express = require('express');
const router = express.Router();

const postController = require ("../controllers/postController");

router.post("/newpost",postController.createPost);

module.exports = router;