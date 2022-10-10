import express from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import connectDB from "./database/connect.js"
import router from "./routes/users.js"
import blogRouter from "./routes/blogs.js"

const app = express()

app.use(morgan("tiny")) 
app.use(cors())
dotenv.config({path:".env"})

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/api/users",router)
app.use("/api/posts",blogRouter) 

const PORT = process.env.PORT || 8080 
connectDB()

app.listen(PORT,()=>{
    console.log(`server is listening on port http://localhost:${PORT}`)
})

