const jwt = require('jsonwebtoken');
const env = require('../config/env.js');
module.exports = function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided');
    try {
        const decoded = jwt.verify(token,env.SECRET_KEY);
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        response.status(400).send('Invalid token');
    }
}