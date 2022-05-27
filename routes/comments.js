const express = require('express')
const router = express.Router()

const {getComments, createComment, updateComment, deleteComment,} = require('../controllers/comments')

router.route('/').get(getComments).post(createComment).patch(updateComment).delete(deleteComment)

module.exports = router
