import user from "../models/user";
export const userById = async (req, res, next, id) => {
    const users = await user.findById(id).exec(); // tìm user dựa trên ID
    req.profile = users;
    next()
}
export const read = (req, res) => {
    const users = req.profile;
    users.hashed_password = undefined;
    users.salt = undefined;
    res.json(users)
}
export const listUser = async (req, res, next) => {
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
            await user.find({}).skip(skipNumber).limit(current).sort({ craeteAt: -1 }).exec((err, doc) => {
                if (err) {
                    res.json(err)
                } else {
                    user.countDocuments({}).exec((count_error, count) => {
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
            const list = await user.find().sort({ craeteAt: -1 }).exec((err, doc) => {
                if (err) {
                      res.json(err)
                } else {
                    user.countDocuments({}).exec((count_error, count) => {
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
            res.status(400).json('failed')
        }
    }

}
export const updateUser = async( req, res) => 
{
        try {
            const update = await user.findOneAndUpdate(req.params, req.body, {new:true})
            res.json(update)
        } catch (error) {
            res.status(400).json({
                err: "failed"
            })
        }
}
export const removeUser = async (req, res) => {
    try {
        const remove = await user.findByIdAndDelete(req.params)
        res.json(remove)
    } catch (error) {
        res.status(400).json({
            err: "failed"
        })
    }
}