const express = require('express');
const blogController = require('../controllers/blogController')

const router = express.Router();

// blog
router.get('/', blogController.blog_index);

// create new blog
router.get('/create', blogController.blog_create_get);

// post request
router.post('/', blogController.blog_create_post);

// get single blog request
router.get('/:id', blogController.blog_details)

// delete response handler
router.delete('/:id', blogController.blog_delete)

module.exports = router;