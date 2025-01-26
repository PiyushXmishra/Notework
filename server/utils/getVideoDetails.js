require('dotenv').config()
const axios = require("axios");

async function getVideoDetails(videoUrl) {
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

  const videoId = extractVideoId(videoUrl);
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${GOOGLE_API_KEY}`;
  const categoryMapping = {
    "1": "Film & Animation",
    "2": "Autos & Vehicles",
    "10": "Music",
    "15": "Pets & Animals",
    "17": "Sports",
    "18": "Short Movies",
    "19": "Travel & Events",
    "20": "Gaming",
    "21": "Videoblogging",
    "22": "People & Blogs",
    "23": "Comedy",
    "24": "Entertainment",
    "25": "News & Politics",
    "26": "How-to & Style",
    "27": "Education",
    "28": "Science & Technology",
    "29": "Nonprofits & Activism",
    "30": "Movies",
    "31": "Anime/Animation",
    "32": "Action/Adventure",
    "33": "Classics",
    "34": "Comedy",
    "35": "Documentary",
    "36": "Drama",
    "37": "Family",
    "38": "Foreign",
    "39": "Horror",
    "40": "Sci-Fi/Fantasy",
    "41": "Thriller",
    "42": "Shorts",
    "43": "Shows",
    "44": "Trailers",
  };
  try {
    const response = await axios.get(apiUrl);
    const videoDetails = response.data.items[0].snippet;
    const categoryId = videoDetails.categoryId;
    const category = categoryMapping[categoryId] || "Unknown Genre";
    const title= videoDetails.title || "Unknown Title"
    console.log("Genre:",category)
    return {category,title}
  } catch (error) {
    console.error("Error fetching video details:", error.response.data.error.message);
  }
}

function extractVideoId(url) {
  const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}


module.exports = {getVideoDetails}
