const { promisify } = require("util");
const jwt = require('jsonwebtoken')
exports.protectedRoute = async (req, res, next) => {
    try {
      
       const token = req.cookies.JWT
     
      if (!token) {
        return next("You are not logged in! Please log in to get access.", 401);
      }
      
  
      // 2) Verification token
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      
      console.log(decoded)
     userId = decoded.id
     console.log(userId)

      next();
    } catch ({ name, message }) {
      res.status(401).json({
        status: name,
        message,
      });
    }
    // 1) Getting token and check of it's there
  };
  