import order from "../models/order"

export const createOrder = async (req, res) => {
    try {
        const addorder = await new order(req.body).save()
        res.status(200).json(addorder)
    } catch (error) {
        res.status(400).json({
            err: "failed"
        })
    }

}
export const listOrder = async (req, res, next) => {
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
            await order.find({}).skip(skipNumber).limit(current).sort({ craeteAt: -1 }).exec((err, doc) => {
                if (err) {
                    res.json(err)
                } else {
                    order.countDocuments({}).exec((count_error, count) => {
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
            const listOrder = await order.find({}).sort({ craeteAt: -1 }).exec((err, doc) => {
                console.log('doc', doc);
                if (err) {
                    console.log(err);
                } else {
                    return order.countDocuments({}).exec((count_error, count) => {
                        if (err) {
                            return res.json(count_error);
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
export const removeOrder = async(req, res) => {
    try {
    const remove = await order.findByIdAndDelete({_id: req.params._id})
        res.status(200).json(remove)
    } catch (error) {
        res.status(400).json({
            err: 'remove failed'
        })
    }
}
export const updateOrder = async(req, res) => {
    try {
        const update = await order.findOneAndUpdate(req.params, req.body, {new :true})
        res.status(200).json(update)
    } catch (error) {
        res.status(400).json({
            err: "failed"
        })
    }
}
export const detailOrder = async (req, res ) => {
    try {
        const detail = await order.findById(req.params).exec()
        res.status(200).json(detail)
    } catch (error) {
        res.status(400).json({
            err: "failed"
        })
    }
}