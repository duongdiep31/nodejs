import people from "../models/people";

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
            await people.find({}).populate('idArea').populate('idUser').skip(skipNumber).limit(current).sort({ 'createdAt': -1 }).exec((err, doc) => {
                if (err) {
                    res.status(400).json(err)
                } else {
                    people.countDocuments({}).exec((count_error, count) => {
                        if (err) {
                            res.json(count_error);
                            return
                        } else {
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
            await people.find().populate('idUser').sort({ craeteAt: -1 }).exec((err, doc) => {
                if (err) {
                    res.status(400).json(err)
                    return
                } else {
                    people.countDocuments({}).exec((count_err, count) => {
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
export const create = async (req, res) => {
    try {
        const peopl = await new people(req.body).save();
        res.json(peopl)
        return
    } catch (error) {
        res.status(400).json({
            error: "Create people failed"
        })
        return
    }
}
export const remove = async (req, res) => {
    try {
        const people = await people.findByIdAndDelete({ _id: req.params._id })
        res.json(people)
    } catch (error) {
        res.status(400).json({
            error: error
        });
    }
}
export const patch = async (req, res) => {
    try {
        const people = await people.findOneAndUpdate(req.params, req.body, { new: true })
        return res.status(200).json(people)
    } catch (error) {
        return res.status(400).json({
            error: "Create product failed"
        })

    }
}
export const find = async (req, res, next) => {
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
            await people.find({}).populate('idArea').populate('idUser').skip(skipNumber).limit(current).sort({ 'createdAt': -1 }).exec((err, doc) => {
                if (err) {
                    res.status(400).json(err)
                } else {
                    people.countDocuments({}).exec((count_error, count) => {
                        if (err) {
                            res.json(count_error);
                            return
                        } else {
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
            await people.find({ 'idArea': { $eq: req.params } }).populate('idUser').sort({ craeteAt: -1 }).exec((err, doc) => {
                if (err) {
                    res.status(400).json(err)
                    return
                } else {
                    people.countDocuments({}).exec((count_err, count) => {
                        const ss = doc.map((item) => {
                            return  item.idUser
                        })
                        if (count_err) {
                            res.status(400).json(count_err)
                            return
                        } else {
                            res.json({
                                total: count,
                                list: ss
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
