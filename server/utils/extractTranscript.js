const AppError= require("../Error/AppError")
const  {YoutubeTranscript} = require( 'youtube-transcript');
let transcript = ""
async function extract_transcript(youtube_video_url){

    const video_id = youtube_video_url.split("=")[1]
    const value = await  YoutubeTranscript.fetchTranscript(video_id)
     if(!value) throw new AppError('Transcription of the video not found', 404);
      transcript = " "
   for (let i = 0; i < value.length; i++) {
             
      transcript += " " + value[i]["text"]

     }
   return new Promise((resolve) => {
      setTimeout(() => resolve(transcript,1000));
   
      //  resolve(transcript)
      //  console.log(transcript)
    });
  
 }

        


      
   
module.exports = {extract_transcript}

