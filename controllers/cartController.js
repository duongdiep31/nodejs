import cartModel from "../models/cartModel"
export const addCart = async (req, res) => {
    try {
        const cartItems = await new cartModel(req.body).save()
        res.status(200).json(cartItems)
    } catch (error) {
        res.status(400).json(error)
    }
}
export const listCart = async (req, res) => {
    try {
            const listCart = await cartModel.find().populate('idBook').populate('idUser').sort({createAt: -1}).exec()
            res.json(listCart)
    } catch (error) {
            console.log(error);
            res.status(400).json({
                err: 'get Cart failed'
            })
    }
}
export const removeCart = async (req, res) => {
    try {
        const remove = await cartModel.findByIdAndDelete({_id: req.params._id})
        res.json(remove)
    } catch (error) {
        res.status(400).json({
            erro: "remove cart failed"
        })
    }
}
export const updateCart = async (req, res) => {
   try {
        const cartItems = await cartModel.findOneAndUpdate(req.params,req.body, {new:true})
        res.status(200).json(cartItems)
    } catch (error) {
        res.status(400).json(error)
    }

}
export const detailCart = async (req, res) => {
    try {
            const detail = await cartModel.findById(req.params).populate('idBook').populate('idUser').exec()
            res.status(200).json(detail)
    } catch (error) {
        res.status(400).json({
            err: 'failed'
        })
    }
}