import express from 'express'
import { isAuth, requireSignin } from '../controllers/auth'
import { commentById, commentDetail, createComment, deleteComment, editComment, listComment } from '../controllers/comment'
const router = express.Router()
router.get('/comment', listComment)
router.post('/comment',requireSignin, createComment)
router.patch('/comment/:_id',requireSignin,  editComment),
router.delete('/comment/:_id', requireSignin, deleteComment)
router.get('/comment/:_id',requireSignin, commentDetail)
module.exports = router