import mongoose from "mongoose";
import  'dotenv/config'

const str = process.env.DBCONNECTSTR;

async function connectDB(){
  try{

      if(str){
        const cont = await mongoose.connect(str);
        if(cont){
            console.log("DB COnnected")
        }
    }

  }catch(e){
    console.log('DB Connected ERROR',e.message)
  }
}

export default connectDB
