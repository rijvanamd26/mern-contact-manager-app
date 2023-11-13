const express = require('express')
const cors = require('cors') 
const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();

const app = express()
app.use(cors())
app.use(express.json())  
const PORT = process.env.PORT || 8000



const schemaData = mongoose.Schema({
    name : String,
    email : String,
    mobile : String,
},{
    timestamps : true
})

const userModel = mongoose.model("user",schemaData)

//read
app.get("/",async(req,res)=>{
    const data = await userModel.find({})
    res.json({success : true, data:data});
})

//create data || save data in mngodb
app.post("/create",async(req,res)=>{
    const data = new userModel(req.body)
    await data.save()
    res.send({success:true, message:"Data saved successfully"});
})

//update data
app.put("/update", async(req, res) =>{
    const {_id, ...rest} = req.body
    const data = await userModel.updateOne({_id:_id},rest)
    res.send({success:true,message:"Data updated successfully",data:data});
})

//delete
app.delete("/delete/:id", async(req, res) =>{
    const id = req.params.id
    const data = await userModel.deleteOne({_id : id})
    res.send({success:true,message:"Data deleted successfully",data:data});
})


mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("server")
    app.listen(PORT,()=>console.log("server is running"))
})
.catch(err => console.log(err))

