import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
title:{
    type: String,
    required:true
},
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
}
},{timestamps:true});

export default  mongoose.model("Todo", todoSchema);