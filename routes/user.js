import express from 'express'
import { listUser, read, removeUser, updateUser, userById } from '../controllers/user';
const router = express.Router();
// router.get('/user/:userId',requireSignin, isAdmin, read )
// router.get('/user',requireSignin, isAdmin, listUser,)
// router.patch('/user/:_id',requireSignin, isAdmin, updateUser)
// router.delete('/user/:_id',requireSignin, isAdmin, removeUser)
// router.param('userId', userById)

router.get('/user/:userId', read )
router.get('/user', listUser,)
router.patch('/user/:_id', updateUser)
router.delete('/user/:_id', removeUser)
router.param('userId', userById)
module.exports = router 