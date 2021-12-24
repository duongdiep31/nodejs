import express from 'express'
import { signin, signout, signup } from '../controllers/auth'
const router = express.Router()
router.post('/register', signup)
router.post('/signin', signin)
router.post('/signout', signout)
module.exports = router