import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    const {token} = req.headers;
    if(!token){
        return res.status(401).json({success: false, msg: 'No token provided!'});
    }

    try
    {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    }
    catch(error){
        return res.status(500).json({success: false, msg: 'Server Error!'});

    }
}

export default authUser;