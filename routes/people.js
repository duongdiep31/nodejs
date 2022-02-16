import express from 'express'
import { create, find, list, patch, remove } from '../controllers/peopleController';
const router = express.Router();
router.get('/people', list)
router.post('/people', create)
router.patch('/people/:_id',patch)
router.delete('/people/:_id',remove)
router.get('/people/:_id',find)

module.exports = router 