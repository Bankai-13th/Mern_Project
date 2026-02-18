const express=require('express')
const NotesRouter=express.Router()
const {CreateNotes,UpdateNotes,DeleteNotes,GetNotes}=require('../controller/NotesController')
const verifytoken=require('../middlewares/verifytoken')

NotesRouter.get("/",verifytoken,GetNotes)

NotesRouter.post("/createnotes",verifytoken,CreateNotes)

NotesRouter.patch('/updatenotes',verifytoken,UpdateNotes)

NotesRouter.delete('/deletenotes',verifytoken,DeleteNotes)


module.exports=NotesRouter