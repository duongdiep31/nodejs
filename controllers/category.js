import slugify from "slugify";
import Category from "../models/category";
export const list = async (req,res) => {
    const categories = await Category.find({}).sort({createAt: -1}).exec()
    res.json(categories)
}
export const create = async (req,res) => {
        console.log(req.body)
    try {
        const { name,image } = req.body;
        const category = await new Category({ name,image, slug: slugify(name) }).save();
            console.log(category);
        res.json(category);
    } catch (err) {
        console.log('err', err);
        res.status(400).json({
            error: "Create category failed"
        })
    }
}
export const slug = async (req,res) => {
    const category = await Category.findById({_id: req.params._id}).exec();
    res.json(category)
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