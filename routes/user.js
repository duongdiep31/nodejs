import express from 'express'
import { isAdmin, isAuth, requireSignin } from '../controllers/auth';
import { listUser, read, removeUser, updateUser, userById } from '../controllers/user';
const router = express.Router();
router.get('/user/:userId',requireSignin, isAdmin, read )
router.get('/users',requireSignin, isAdmin, listUser,)
router.patch('/users/:_id',requireSignin, isAdmin, updateUser)
router.delete('/users/:_id',requireSignin, isAdmin, removeUser)
router.param('userId', userById)
module.exports = router 