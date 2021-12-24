import express from 'express'
import { isAdmin, isAuth, requireSignin } from '../controllers/auth';
import { listUser, read, removeUser, updateUser, userById } from '../controllers/user';
const router = express.Router();
router.get('/user/:userId',requireSignin, isAdmin, read )
router.param('userId', userById)
router.get('/users', listUser)
router.patch('/users/:_id', updateUser)
router.delete('/users/:_id', removeUser)
module.exports = router 