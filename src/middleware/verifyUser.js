import jwt from 'jsonwebtoken'

const verifyUser = (req, res, next) => {

    const token = req.headers["authorization"];

    if (!token) {
        return res.status(400).json({
            success: false, message: "Token missing"
        })
    }
    let barrerToken = token.split(" ")[1];
    if (!barrerToken) {
        return res.status(400).json({
            success: false, message: "Token missing"
        })
    }

    try {
        const data = jwt.verify(barrerToken, process.env.JWT_SECRET);
        req.user = data.user;
        next();

    } catch (error) {
        console.log("Token: " + error);
        res.status(403).json({
            success: false,
            message: error.message
        })
    }

}

export { verifyUser }