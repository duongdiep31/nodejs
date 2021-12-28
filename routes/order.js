import express from 'express'
import { isAuth, isCart, requireSignin } from '../controllers/auth';
import { orderByid,createOrder, detailOrder, listOrder, removeOrder, updateOrder} from '../controllers/orderController'
const router = express.Router();
router.get('/listOrder', listOrder)
router.post('/addOrder',requireSignin, createOrder)
router.delete('/removeOrder/:_id',requireSignin, isAuth, removeOrder)
router.patch('/updateOrder/:_id',requireSignin,isAuth && isCart, updateOrder)
router.get('/detailOrder/:_id',requireSignin, isAuth && isCart, detailOrder)
router.param('_id', orderByid)
module.exports = router 