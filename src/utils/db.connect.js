import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async() =>{
  
  // console.log("MONGO_URL:", process.env.MONGO_URL);

  if (mongoose.connections[0].readyState) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DataBase Connected");
  
  } catch (error) {
    console.log(error)
  }
}

