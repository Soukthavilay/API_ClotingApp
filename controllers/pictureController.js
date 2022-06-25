const fs = require('firebase-admin');
const sharp = require('sharp');
const fss = require('fs')
const path = require('path');
const firestore = fs.firestore();

const uploadImageControll = async(req,res)=>{
    if(!req.file) {
        return res.status(400).send("Error: No files found")
    } 
    const {product_id : product_id, isFirst} = req.body
   const dir = "public/image/"+product_id+"/" 
    const newPath = path.resolve(dir,req.file.originalname)
    if (!fss.existsSync(dir)){
        fss.mkdirSync(dir);
    }
  
    try {
    await sharp(req.file.path)
    .jpeg({ quality: 100 })
    .toFile(
       newPath
    )
    fss.unlinkSync(req.file.path)
    const newData = {
        product_id : product_id,
        url : `${product_id}/${req.file.originalname}`,
        isFirst : isFirst
        
    }
    await firestore.collection('picture_product').doc().set(newData);
    return res.status(200).json({msg : "upload image success"})
}catch(err){
    return res.status(500).json({msg : err})
}
}

module.exports = uploadImageControll