import comment from "../models/comment"
export const listComment = async ( req, res) => {
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
            await comment.find({}).populate('cateId').skip(skipNumber).limit(current).sort({ 'createdAt': -1 }).exec((err, doc) => {
                if (err) {
                    res.json(err)
                } else {
                    comment.countDocuments({}).exec((count_error, count) => {
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
            const list = await comment.find().populate('cateId').sort({ craeteAt: -1 }).exec((err, doc) => {
                if (err) {
                    res.status(400).json(err)
                } else {
                    comment.countDocuments({}).exec((count_err, count) => {
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
export const createComment = async (req, res) => {
    try {
    const comments = await new comment(req.body).save()
        res.json(comments)
    } catch (error) {
        res.status(400).json(error)
    }
    
}

export const editComment = async (req, res) => {
    try {
    const comments = await  comment(req.params,req.body,{new:true})
        res.json(comments)
    } catch (error) {
        res.status(400).json(error)
    }
    
}
export const deleteComment = async (req, res) => {
    try {
    const comments = await comment.findByIdAndDelete(req.params)
        res.json(comments)
    } catch (error) {
        res.status(400).json(error)
    }
    
}