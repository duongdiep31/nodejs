import express from 'express'
import { isAdmin, isAuth, requireSignin } from '../controllers/auth';
const router = express.Router();
import { create, list,patch, remove, removecate, slug } from '../controllers/category';


router.get('/categories', list)
// router.post('/category/:userId', requireSignin,isAdmin, isAuth , create)
router.post('/addCategories',create)
router.get('/categories/:_id',slug)
router.patch('/categories/:_id',patch)
router.delete('/categories/:_id',removecate)



module.exports = router