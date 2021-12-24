import slugify from "slugify";
import Product from "../models/products";
export const list = async (req, res, next) => {
    const { page, limit } = req.query
    if (page && limit) {
        //getPage
        let perPage = parseInt(page)
        let current = parseInt(limit)
        if (perPage < 1 || perPage == undefined || current == undefined) {
            perPage = 1
            current = 9
        }
        const skipNumber = (perPage - 1) * current
        try {
            await Product.find({}).populate('cateId').skip(skipNumber).limit(current).sort({ craeteAt: -1 }).exec((err, doc) => {
                if (err) {
                    res.json(err)
                } else {
                    Product.countDocuments({}).exec((count_error, count) => {
                        if (err) {
                            return res.json(count_error);
                        }
                        return res.json({
                            total: count,
                            list: doc
                        })
                    })
                }

            })
        } catch (error) {
            res.status(400).json(error)
        }
    } else {
        //getall
        try {
            const list = await Product.find().populate('cateId').sort({ craeteAt: -1 }).exec((err, doc) => {
                if (err) {
                    res.status(400).json(err)
                } else {
                    Product.countDocuments({}).exec((count_err, count) => {
                        if (count_err) {
                            return res.status(400).json(count_err)
                        } else {
                            return res.json({
                                total: count,
                                list: doc
                            })
                        }
                    })
                }
            })
        } catch (error) {
            res.status(400).json('failed')
        }
    }

}
export const read = async (req, res) => {
    const product = await Product.findById({ _id: req.params._id }).populate('cateId').exec();
    console.log(product)
    res.json(product)
}
export const create = async (req, res) => {
    req.body.slug = slugify(req.body.name);
    try {
        const product = await new Product(req.body).save();
        res.json(product)
    } catch (error) {
        res.status(400).json({
            error: "Create product failed"
        })
    }
}
export const remove = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete({ _id: req.params._id })
        res.json(product)
    } catch (error) {
        res.status(400).json({
            error: error
        });
    }
}
export const patch = async (req, res) => {
    const { name, image, price, description, category } = req.body
    try {
        const product = await Product.findOneAndUpdate(
            req.params, { name, image, price, description, category, slug: slugify(name) }, { new: true })
        res.json(product)
    } catch (error) {
        res.status(400).json({
            error: "Create product failed"
        })

    }
}
export const listRelated = async (req, res) => {
    const product = await Product.findById(req.params._id).exec();
    console.log(product);
    const related = await Product.find({
        _id: { $ne: product._id },
        category: product.category
    })
        .limit(4)
        .populate('cateId')
        .exec();
    res.json(related);
}
export const search = async (req, res) => {
    const query = req.query.name
    const { page, limit } = req.query
    let perPage = parseInt(page)
    let current = parseInt(limit)
    if (perPage < 1 || perPage == undefined || current == undefined || query == undefined) {
        perPage = 1
        current = 9
    }
    const skipNumber = (perPage - 1) * current
    try {
        const listSearch = await Product.find({ name: new RegExp(query, 'i') }).populate('cateId')
            .skip(skipNumber)
            .limit(current).sort({ createAt: -1 })
        const countSearch = await Product.find({ name: new RegExp(query, 'i') }).populate('cateId')
        const count = countSearch.length
        return res.json({
            list: listSearch,
            total: count
        })
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}
