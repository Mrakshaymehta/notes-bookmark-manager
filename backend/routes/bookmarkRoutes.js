const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');

router.get('/', bookmarkController.getAllBookmarks);
router.post('/', bookmarkController.createBookmark);
router.get('/:id', bookmarkController.getBookmarkById);
router.put('/:id', bookmarkController.updateBookmark);
router.delete('/:id', bookmarkController.deleteBookmark);

module.exports = router;
