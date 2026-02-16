
import mongoose from "mongoose"
const mongoose_url = process.env.MONGODB_URI!

export async function connectDB() {


    try {

        if(mongoose.connection.readyState === 1){
            console.log("db already connected")
            return;
        }
        
        await mongoose.connect(mongoose_url,).then(()=>{
            console.log("db is connected")
        })
       
    } catch (error) {
        console.error(error)
    }
}