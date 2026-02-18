const NoteModel=require('../model/NotesModel')

const GetNotes=async(req,res)=>{
    try {
        let {_id}=req.payload
        
     const userNotes=  await NoteModel.find({user:_id})
     return res.status(200).json({message:userNotes})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error})
    }
}

const CreateNotes=async(req,res)=>{
    if(req.body == undefined){
        return res.status(400).json({message:"request is undefined"})
    }

    try {
        const {_id}=req.payload
        const {Note}=req.body
        await NoteModel.insertOne({Note,user:_id})
        return res.status(201).json({message:"Notes created successfully"})
        
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error})
    }
}

const UpdateNotes=async(req,res)=>{
    try {
     const {Note}=req.body
     const[old,newvalue]=Note

    let user= await NoteModel.findOne({Note:old})
    const {_id}=user

    await NoteModel.updateOne({_id},{$set:{Note:newvalue}})
    return res.status(201).json({message:"Note is Updated"})

        
        
    } catch (error) {
        return res.status(500).json({message:"internal server error"})
    }
}

const DeleteNotes=async(req,res)=>{
  
   let {Note}=req.body
   console.log(Note,req.headers)
try {
     await NoteModel.deleteOne({Note})
   return res.status(200).json({message:"Note Deleted Successfully"})
} catch (error) {
    return res.status(500).json({message:error})
}
}

module.exports={CreateNotes,UpdateNotes,DeleteNotes,GetNotes}