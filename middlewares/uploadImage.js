const multer = require("multer")
const path = require('path')

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'public/image')
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const imageUpload = multer({
    storage : storage,
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error("Please upload a image"))
        }
        cb(undefined,true);
    }
})
module.exports = imageUpload;