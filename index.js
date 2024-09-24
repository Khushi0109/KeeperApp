import express from "express"
import cors from "cors"
import mongoose from "mongoose"
mongoose.connect("mongodb://localhost:27017/mykeeperAppDB",{useNewUrlParser:true,useUnifiedTopology:true},()=>console.log("DB connected"));
const app=express();
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
const keeperSchema=mongoose.Schema({
    title:String,
    content:String
});
const Keeper=new mongoose.model("Keeper",keeperSchema);
app.get("/api/getAll",(req,res)=>{
    Keeper.find({},(err,keeperList)=>{
        if(err){
            console.log(err)
        } else {
            res.status(200).send(keeperList);
        }
    });
});
app.post("/api/addNew",(req,res)=>{
    const {title,content}=req.body;
    const note=new Keeper({
        title,
        content
    });
    note.save(err=>{
        if(err){
            console.log(err);
        }
        Keeper.find({},(err,notes)=>{
            if(err){
                console.log(err)
            } else {
                res.status(200).send(notes);
            }
        });
    });
});
app.post("/api/delete",(req,res)=>{
    const {id}=req.body;
    Keeper.deleteOne({_id:id},()=>{
        Keeper.find({},(err,notes)=>{
            if(err){
                console.log(err);
            } else {
                res.status(200).send(notes);
            }
        })
    })
});
app.listen(3001,()=>{
    console.log("backend created at port 3001");
});
