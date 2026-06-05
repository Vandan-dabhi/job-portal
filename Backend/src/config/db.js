import mongoose from "mongoose";


const connectDB = async () => {
     try{
      const conn = await mongoose.connect(process.env.MONGO_URI)
      console.log("db connected successfully")
     }catch(err){
      console.log(err)
     }
}

export default connectDB;