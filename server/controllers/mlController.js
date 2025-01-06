const FPDF = require('node-fpdf')
const fs = require("fs")
const path = require("path")
const notePrompt = require('./../models/promptModel')
const {createUrl} = require("../utils/createURL")
require("dotenv").config
const prompt="You are Youtube video summarizer. You will take transcribed text and summarize entire video by writing important summary stictly in following way: 1. a suitable title for summary. 2 Small introductory paragraph then description in points. 3. Give the summary only in english language. So, Please provide the summary of the text given here:  "
const {geminiflash} = require("../utils/geminiFlash")
const {extract_transcript} = require("../utils/extractTranscript")
const { url } = require('inspector')
const { response } = require('express')
const { error } = require('console')
const { gemini } = require('../utils/geminiAn')

const filePath = path.join(__dirname, './../disk/A.pdf'); 
const regex = /\.be\/([^?]+)/;
exports.Summary= async(req,res,next)=>{
    
        try{
                let id=''
                const {input}=  req.body
                const videoId = input.match(regex)
                if(!videoId) {
                id= input.split('=')[1]

                }else{
                 id= input.split('/').pop().split('?')[0]
                }

                console.log(id)

             
               
                const img = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
        const transcript = await  extract_transcript(id)
     
        
        const response= await  geminiflash(transcript,prompt)
               
                const pdf = new FPDF('P','mm','A4');
                pdf.AddPage();
                pdf.SetFont('Arial','B',12);
                pdf.MultiCell(0,10,response.text);
                pdf.Output('F',filePath);
                const promptModel = await notePrompt.create({
                  userId,
                  heading:response.heading,
                  prompt:input,
                  summary : response.text,
                   genre:response.topic,
                  summaryUrl:"youtube_link",
                  thumbnail:img
                })
            
         await promptModel.save()

         res.status(200).json({
            status:"ok",
            data:{
             heading:response.heading,
             summary:response.text,
              id:promptModel._id,
              genre:response.topic
            }
           
          })
        }catch(err){
          next(err)
          
        }
   
}

exports.Pdf = async(req,res,next)=>{
  try{
  const link = await createUrl()
  const {id }= req.params
  console.log(`${userId}`)
  const notePdf = await notePrompt.findByIdAndUpdate(id,{summaryUrl:link.url})
  console.log(notePdf)
  await notePdf.save()
   res.status(200).json({
    status:"success",
    data: link.url
   
   })
}catch({name,message}){
   res.status(404).json({
  status: "fail",
  errorType:name,
  message
   })
   console.log(message)
}
}


exports.thumbnail = async(req,res,next)=>{
 try{ 
  const userId = req.params.id
  const db = await notePrompt.find({userId})
console.log(db)
  if(!db) return new Error('Could not find any data')
 

  const thumbnail = db.map((value,index)=> db[index].thumbnail  )
  const heading = db.map((value,index)=> db[index].heading  )
  const url = db.map((value,index)=>db[index].summaryUrl)
  const genre = db.map((value,index)=>db[index].genre)


  console.log(thumbnail)
  res.status(200).json({
    status:"success",
    data:{
  thumbnail,
  heading,
  genre,
  url


}
  })
}catch({name,message}){
   res.status(401).json({
  status: name,
   message
  })
}
}


exports.removeDoc = async(req,res,next)=>{
   const {thumbnail}= req.body
   try{
   const isDelete = await notePrompt.deleteOne({thumbnail})
   if(!isDelete) return new Error("An error occured while deleting",error)
   res.status(200).json({
   status:"Success",
   message:"Doc has been deleted"
  }) 
}catch({name,message}){
  res.status(404).json({
    status:name,
    message:message
  })
 }
}







