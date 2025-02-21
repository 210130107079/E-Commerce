import jwt from 'jsonwebtoken'

const AdminAuth = async (req, res, next) => {
    try
    {
        const { token } = req.headers
        if(!token){
            return res.status(401).json({success: false, msg: "No token provided!"})
        }
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(token_decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.status(403).json({success: false, msg: "Unauthorized Access!"})
        }
        next()
    }
    catch(error)
    {
        console.error(error)
        return res.status(500).json({success: false, msg: "Server Error!"})
    }
}

export default AdminAuth