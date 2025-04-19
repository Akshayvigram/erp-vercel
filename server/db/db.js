import mongoose from "mongoose";

export const connectToDataBase=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected");
        
    } catch (error) {
        console.log("database error");
        
        console.error(error);
    }
}