import Area from '../models/area'
import people from '../models/people'
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
            await Area.find({}).populate('idProject').skip(skipNumber).limit(current).sort({ 'createdAt': -1 }).exec( (err, doc) => {
                if (err) {
                    res.status(400).json(err)
                } else {
                    Area.countDocuments({}).exec((count_error, count) => {
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
          await Area.find().populate('idProject').sort({ craeteAt: -1 }).exec((err, doc) => {
                if (err) {
                    res.status(400).json(err)
                    return
                } else {
                    Area.countDocuments({}).exec((count_err, count) => {
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
        const area = await new Area(req.body).save();
        res.json(area)
        return
    } catch (error) {
        res.status(400).json({
            error: "Create Area failed"
        })
        return
    }
}
export const remove = async (req, res) => {
    try {
        const area = await Area.findByIdAndDelete({ _id: req.params._id })
        res.json(area)
    } catch (error) {
        res.status(400).json({
            error: error
        });
    }
}
export const patch = async (req, res) => {
    try {
        const area = await Area.findOneAndUpdate(req.params, req.body , { new: true })
            return  res.status(200).json(area)
    } catch (error) {
       return res.status(400).json({
            error: "Create product failed"
        })
    }
}
