import jwt from "jsonwebtoken";
import expressJwt from 'express-jwt'
import user from "../models/user";
export const signup = async (req, res) => {
    console.log(req.body)
    try {
        const { email, name, phone, password } = req.body;
        const users = await new user({ email, name, phone, password }).save()
        res.json(users)
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "failed"
        })
    }

}

export const signin = async (req, res) => {
    const { email, password } = req.body;
    const users = await user.findOne({ email }).exec();
    if (!users) {
        return res.status(400).json({
            msg: "Tài khoản không tồn tại"
        })
    }
    else if (!users.authenticate(password)) {
        return res.status(400).json({
            msg: "Email hoặc password không đúng"
        })
    }
    else {
        const token = jwt.sign({ _id: user._id }, '123456'); // encode: 
        res.cookie('token', token, { expire: new Date() + 9999 });
        res.json({
            token,
            users: {
                _id: users._id,
                name: users.name,
                email: users.email,
                phone: users.phone,
                role: users.role
            }
        });
    }
}
export const signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        msg: "Signout Successfully"
    })
}
export const requireSignin = expressJwt({ // decode
    secret: '123456',
    algorithms: ["HS256"],
    userProperty: "auth" // req.auth
});
export const isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        res.json({
            msg: "Access Denined"
        })
    }
    next();
}
export const isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            msg: "Bạn không có quyền truy cập"
        })
    }
    next();
}