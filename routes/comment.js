import express from 'express'
import { isAuth, requireSignin } from '../controllers/auth'
import { createComment, deleteComment, editComment, listComment } from '../controllers/comment'
const router = express.Router()
router.get('/comment', listComment)
router.post('/comment',requireSignin, createComment)
router.patch('/comment/:_id', requireSignin , editComment),
router.delete('/comment/:_id', requireSignin, deleteComment)
module.exports = router