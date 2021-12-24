import express from "express";
import { addWishlist, listWish, removeWishlist } from "../controllers/wishlistController";
const router = express.Router()
router.post('/wishlist', addWishlist)
router.get('/wishlist', listWish)
router.delete('/wishlist/:_id', removeWishlist)
module.exports = router