// Server-side code
const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function cacheUserProfileImage(imageUrl, name) {
  try {
    const response = await axios({
      url: imageUrl,
      method: 'GET',
      responseType: 'stream'
    });
    
    // Create a images directory if it doesn't exist
    const imagesDir = path.join(__dirname, './../disk/');
    if (!fs.existsSync(imagesDir)){
      fs.mkdirSync(imagesDir, { recursive: true });
    }
    
    // Save the image with user's ID
    const imagePath = path.join(imagesDir, `${name}.jpg`);
    const writer = fs.createWriteStream(imagePath);
    
    response.data.pipe(writer);
    
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      console.log("Executing file writing.....")
      writer.on('error', reject);
    });
  } catch (error) {
    console.error('Error caching profile image:', error);
    throw error;
  }
}


module.exports= {cacheUserProfileImage}