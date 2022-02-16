import express from 'express'
import { create, list, patch, remove } from '../controllers/area';
const router = express.Router();
router.get('/area', list)
router.post('/area', create)
router.patch('/area/:_id',patch)
router.delete('/area/:_id',remove)
module.exports = router 