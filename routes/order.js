import express from 'express'
import { createOrder, detailOrder, listOrder, removeOrder, updateOrder} from '../controllers/orderController'
const router = express.Router();
router.get('/listOrder', listOrder)
router.post('/addOrder', createOrder)
router.delete('/removeOrder/:_id', removeOrder)
router.patch('/updateOrder/:_id', updateOrder)
router.get('/detailOrder/:_id', detailOrder)
module.exports = router 