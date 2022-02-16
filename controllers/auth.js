import jwt from "jsonwebtoken";
import expressJwt from 'express-jwt'
import user from "../models/user";
export const signup = async (req, res) => {
    try {
        const { email, name, phone, password } = req.body;
        const users = await new user({ email, name, phone, password }).save()
        res.json({
            user: users,
            msg: " Đăng kí thành công"
        })
    } catch (error) {
        res.status(400).json({
            msg: "Tài khoản đã tồn tại"
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
        const token = jwt.sign({ _id: user._id }, 'securityJwt'); // encode: 
        res.cookie('token', token, { expire: new Date() + 9999 });
        res.json({
            token,
            users: {
                _id: users._id,
                name: users.name,
                email: users.email,
                phone: users.phone,
                role: users.role
            },
            msg: "Đăng nhập thành công"
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
    secret: 'securityJwt',
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
    if (req.auth.role === 0 || req.auth.role === 2) {
        return res.status(403).json({
            msg: "Bạn không có quyền truy cập"
        })
    }
    next();
}
export const isContent = (req, res, next) => {
    if (req.auth.role === 3 || req.auth.role === 0  ) {
        return res.status(403).json({
            msg: "Bạn không có quyền truy cập"
        })
    }
    next();
}
export const isCart = (req, res, next) => {
    if (req.auth.role === 4|| req.auth.role ===0  ) {
        return res.status(403).json({
            msg: "Bạn không có quyền truy cập"
        })
    }
    next();
}
