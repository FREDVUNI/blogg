import mongoose from "mongoose"

const connectDB = async () =>{
    try{
        const con = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            retryWrites:false 
        })
        console.log(`connected to the database.`)
    }
    catch(error){
        console.log(`Failed to connect to the database`)
        process.exit(1)
    }
}

export default connectDB