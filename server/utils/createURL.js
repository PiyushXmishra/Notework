const {v2} = require("cloudinary")
const path = require("path")
require("dotenv").require
const createUrl= async()=>{
    try{
  
    v2.config({ 
        cloud_name: 'dmuigsle3', 
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret:  process.env.CLOUDINARY_API_SECRET 
    });
    const pdfPath = path.join(__dirname, './../disk', 'A.pdf');
    // Upload an image
     const uploadResult = await v2.uploader
       .upload(
           pdfPath, {
               resource_type:"raw",
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
  
  
    return uploadResult
      }catch(err){
        res.send(err)
      }  // Transform the image: auto-crop to square aspect_ratio
   
}

module.exports =  {createUrl}