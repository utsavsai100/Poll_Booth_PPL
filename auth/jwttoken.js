const jwt = require('jsonwebtoken');
const CLIENT_SECRET = process.env.CLIENT_SECRET

const createToken = (id) => {
    return jwt.sign({ id }, CLIENT_SECRET, {
        expiresIn: 2 * 24 * 60 * 60
    })
}

module.exports = { 
    createToken
};