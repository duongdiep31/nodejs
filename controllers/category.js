import slugify from "slugify";
import Category from "../models/category";
export const cateById = async (req, res, next, id) => {
    const category = await Category.findById(id).exec()
    req.category = category
    next()
}
export const slug = async (req, res) => {
    const cate = req.category
    res.json(cate)
}
export const list = async (req,res) => {
    const categories = await Category.find({}).sort({createAt: -1}).exec()
    res.json(categories)
}
export const create = async (req,res) => {
    try {
        const { name,image } = req.body;
        const category = await new Category({ name,image, slug: slugify(name) }).save();
        res.json(category);
    } catch (err) {
        res.status(400).json({
            error: "Create category failed"
        })
    }
}

export const removecate = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete({_id: req.params._id})
        res.json(category)
    } catch (error) {
        res.status(400).json({
            error: error
          });
    }

}
export const patch = async (req,res) => {
    const {name, image} = req.body
try {
    const category = await Category.findOneAndUpdate(
       req.params,{name, image, slug: slugify(name)},{new: true})
    res.json(category)
} catch (error) {
    res.status(400).json({
        error: "Create category failed"
})

}}