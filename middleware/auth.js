const jwt = require('jsonwebtoken')
//Node.js natively does not load .env files, so we must utilize the dotenv package to load the file and expose the values via process.env.
require('dotenv').config();

const verifyToken = (req, res, next) => {
    console.log("in auth middleware------")
    let auth = req.headers.authorization;
    let token = auth && auth.split(' ')[1]
    if (!token) {
        res.status(403).send("Token not provided!");
    }
    try {
        let decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY, );
        req.user = decodedToken && decodedToken.user;
    }
    catch (error) {
        res.send(error)
    }
    return next();
}
module.exports = verifyToken;