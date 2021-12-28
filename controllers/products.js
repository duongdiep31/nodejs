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
            await Product.find({}).populate('cateId').skip(skipNumber).limit(current).sort({ 'createdAt': -1 }).exec( (err, doc) => {
                if (err) {
                    res.status(400).json(err)
                } else {
                    Product.countDocuments({}).exec((count_error, count) => {
                        if (err) {
                             res.json(count_error);
                             return
                        }else{
                         res.status(200).json({
                            total: count,
                            list: doc
                        })
                        return
                    }
                    })
                }

            })
        } catch (error) {
            res.status(400).json(error)
            return
        }
    } else {
        //getall
        try {
          await Product.find().populate('cateId').sort({ craeteAt: -1 }).exec((err, doc) => {
                if (err) {
                    res.status(400).json(err)
                    return
                } else {
                    Product.countDocuments({}).exec((count_err, count) => {
                        if (count_err) {
                             res.status(400).json(count_err)
                             return
                        } else {
                             res.json({
                                total: count,
                                list: doc
                            })
                            return
                        }
                    })
                    return
                }
            })
        } catch (error) {
            res.status(400).json('failed')
            return
        }
    }

}
export const read = async (req, res) => {
    const product = await Product.findById({ _id: req.params._id }).populate('cateId').exec();
    res.json(product)
}
export const create = async (req, res) => {
    req.body.slug = slugify(req.body.name);
    try {
        const product = await new Product(req.body).save();
        res.json(product)
        return
    } catch (error) {
        res.status(400).json({
            error: "Create product failed"
        })
        return
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
    try {
        const product = await Product.findOneAndUpdate(req.params, req.body , { new: true })
            return  res.status(200).json(product)
    } catch (error) {
       return res.status(400).json({
            error: "Create product failed"
        })

    }
}
export const listRelated = async (req, res) => {
    const product = await Product.findById(req.params._id).exec();
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
        res.status(400).json(error)
    }
}
export const trending = async (req, res) => {
        
    const trending = await Product.find({
        "trending": {$gt: 0}
    })
    .limit(12).sort({
        'trending': -1
    })
    res.json(trending)


}