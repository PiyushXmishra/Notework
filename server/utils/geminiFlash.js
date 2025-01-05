require("dotenv").config()
const {GoogleGenerativeAI} = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});
async function geminiflash(transcribe,prompt){
    try{
     const finalPrompt= prompt+" \n" +transcribe
     const IntialPrompt=`Give this a suitable title omitting all **, **, inverted commas or any other notation just simple heading in 2-5 words . The text is given below: \n ${transcribe}`
     const GenrePrompt=`You will be provided with summary of user searched data, analyze the summary and give the topic or genre name which is searched by the user.The summaries are as follows: ${transcribe}`

     console.log(finalPrompt)
    const title = await model.generateContent(IntialPrompt)
    const result =  await model.generateContent(finalPrompt)
    let topic = await model.generateContent(GenrePrompt)
    topic = topic.response.text()
    const heading = title.response.text()
    const text= result.response.text()
    return new Promise((resolve) => {
        resolve({text,heading,topic})
      });
    }catch(e){
       console.log(e)
    }
}

module.exports =  {geminiflash}


// Generate at least 4 summaries first
// Dump it into Ai , get genres and recommendations.
// For genres: If user prompts for 1 genre at multiple times, give them more value at bar graph and then decrease the bar sizes.
// For summaries: Find the recommended Topics for the user that user should explore.
// Show the recommended topics and graph analytics accordingly.


