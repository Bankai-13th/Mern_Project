const express=require('express')
const connectdb = require('./db/dbConnect')
const cors=require('cors')
const userRouter = require('./routes/userRouter')
const changesRouter=require('../server/routes/changesRouter')
const NotesRouter=require('../server/routes/NotesRouter')
const app=express()
app.use(express.json())
app.use(cors())
app.use('/api/user',userRouter)

app.use('/api/user/update',changesRouter)

app.use('/api/user/notes',NotesRouter)


connectdb() //connecting database 



app.listen(5000,()=>{
    console.log("server started successfully")
})