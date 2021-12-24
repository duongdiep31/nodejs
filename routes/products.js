import express from 'express'
import { create, list, listRelated, patch, read, remove, search } from '../controllers/products';
import products from '../models/products';
const router = express.Router();
router.get('/book/list', list)
router.get('/book/detail/:_id',read)
router.post('/book/create', create)
router.patch('/book/update/:_id',patch)
router.delete('/book/remove/:_id', remove)
router.post('/generate-fake-data',() =>{
    for (let i = 0; i <= 1000; i++) {
        products.create({
            name: "Dương Điệp" + i,
            price: 2000,
            cateId:"61c18cb8736d26f740e662b2",
            image: "https://firebasestorage.googleapis.com/v0/b/typescript-ec8ed.appspot.com/o/categoriesImage%2F41wzucdhgkl-sx311-bo1-204-203-200.jpeg?alt=media&token=73fe799f-0677-4e1d-9d9e-529e25e63c48" + i,
            description: "Ok" + i,
            status: "Còn Hàng",
            author: "Ngô thừa ân",
            discount: 20,
            quantity: 4
        })
    }
})
router.post('/book/search', search)
router.post('/related/:_id', listRelated)
module.exports = router 