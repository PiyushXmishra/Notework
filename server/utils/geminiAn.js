require("dotenv").config()
const {GoogleGenerativeAI} = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});
const prompt="You will be provided with a summary of video , analyze the summary and give the  genre in one or two words among these genres only i.e.   Autos & Vehicles, Music Pets & Animals, Sports , Short Movies, Travel & Events, Gaming, Videoblogging, People & Blogs, Comedy, Entertainment, News & Politics, Howto & Style, Stock Market, Factual, Education, Science & Technology,AI , Blockchain, Nonprofits & Activism, Movies, Anime/Animation, Action/Adventure, Classics, Documentary, Drama, Family , Foreign ,  Horror ,Sci-Fi/Fantasy, Thriller, Shorts ,Shows & Trailers. Decide the genre of this summary given ahead : "
async function gemini(summary){
    try{
     
     const finalPrompt= prompt+" \n" + summary
    const result =  await model.generateContent(finalPrompt)
   const genre =  result.response.text()
    return new Promise((resolve) => {
        resolve(genre)
      });
    }catch(e){
       console.log(e)
    }
}

module.exports =  {gemini}