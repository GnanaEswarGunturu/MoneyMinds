const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized! Please login to continue.",
        });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.body = req.body || {};
        if (decodedToken.id) {
            req.body.userId = decodedToken.id;
        } else {
            return res.status(400).json({
                success: false,
                message: "Unauthorized! Please login to continue.",
            });
        }
        next();
    } catch (error) {
        return res.json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = userAuth;
