import express from "express";
import { addCart, detailCart, listCart, removeCart, updateCart } from "../controllers/cartController";
const router = express.Router()
router.post('/addcart', addCart)
router.get('/listCart', listCart)
router.delete('/deleteCart/:_id', removeCart)
router.patch('/updateCart/:_id', updateCart)
router.get('/detailCart/:_id', detailCart)
module.exports = router