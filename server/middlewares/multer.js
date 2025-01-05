const multer = require('multer')

module.exports = function(req,res,next){
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./../disk")
    },
    filename: function (req, file, cb) {
      console.log(file.originalname)
      cb(null, file.originalname)
    }
  })

    const upload = multer({ 
        storage, 
    })


 
}


