const mongoose=require('mongoose')
const NotesSchema=new mongoose.Schema({
    Note:{type:String,required:true},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
})

const NoteModel=mongoose.model('Note',NotesSchema)

module.exports=NoteModel;