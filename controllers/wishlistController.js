import wishlistModel from "../models/wishlistModel"

export const addWishlist = async (req, res) => {
    try {
        const create = await new wishlistModel(req.body).save()
        res.status(200).json(create)
    } catch (error) {
        res.status(400).json({
            err: "failed"
        })
    }
}
export const listWish = async (req, res) => {
    try {
        const list = await wishlistModel.find().populate('idBook').populate('idUser').sort({ createAt: -1 }).exec()
        res.json(list)
    } catch (error) {
        console.log(error);
        res.status(400).json({
            err: 'get Wish List failed'
        })
    }
}
export const removeWishlist = async (req, res) => {
    try {
        const remove = await wishlistModel.findByIdAndDelete({ _id: req.params._id })
        res.json(remove)
    } catch (error) {
        res.status(400).json({
            erro: "remove cart failed"
        })
    }
}
