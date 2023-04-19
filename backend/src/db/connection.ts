import mongoose from "mongoose";

const connectDB =()=>{
    mongoose.connect(process.env.MONGOOSE_URI!)
    .then(()=>{
        console.log("connection is successful");
        
    }).catch((err)=>{
        console.log(err);
        
    })
}
export default connectDB ;
