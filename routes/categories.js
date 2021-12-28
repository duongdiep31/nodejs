import express from 'express'
import {  isAuth, isContent, requireSignin } from '../controllers/auth';
const router = express.Router();
import { cateById, create, list,patch, removecate, slug } from '../controllers/category';


router.get('/categories', list)
router.post('/addCategories',requireSignin,isContent , create)
router.get('/categories/:_id', slug)
router.patch('/categories/:_id',requireSignin,isContent, patch)
router.delete('/categories/:_id',requireSignin,isContent,removecate)
router.param('_id', cateById)
module.exports = router