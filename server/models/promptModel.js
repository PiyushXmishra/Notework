const mongoose = require('mongoose')

const {Schema} = mongoose

const promptSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'noteUser', required: true },
    heading:{type:String,required:true},
    prompt:{

        type:String,
        required:true,
        createdAt: { type: Date, default: Date.now }
    },
    summary:{
        type: String,
        required:true
    },
    summaryUrl:{
       type:String,
    //    required:true,
       
    },
    genre:{
        type:String,required:true
    },

    title:{
        type:String,required:true
    },

    createdAt: { type: Date, default: Date.now },
    thumbnail:{type: String, }

})

const notePrompt = mongoose.model('notePrompt',promptSchema)
module.exports= notePrompt