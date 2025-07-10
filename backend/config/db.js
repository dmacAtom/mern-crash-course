import mongoose from "mongoose"

export const connectDB = async () => {
    try{
        const db = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected : ${db.connection.host}`);
    }catch(e){
        console.log("error :", e.message);
    }
    
}