const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('D:/Dev/week-7/week-7 course app/backend/config.js')

function adminMiddleware(req, res, next){
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    
    try{
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
        if(decodedValue.username){
            next()
        }else{
            res.status(403).json({
                msg: "you are not authenticated"
            })
        }
    }catch(error){
        res.json({
            error: "incorrect inputs"
        })
    }
}

module.exports = adminMiddleware;