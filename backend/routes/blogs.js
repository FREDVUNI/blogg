import express from "express"
const blogRouter = express.Router()
import {getBlogs,addPost,updatePost,postById,deletePost,userById} from "../controllers/blogController.js"

blogRouter.get("/",getBlogs)
blogRouter.post("/create",addPost)
blogRouter.put("/update/:id",updatePost)
blogRouter.get("/:id",postById)
blogRouter.get("/user/:id",userById)
blogRouter.delete("/delete/:id",deletePost)

export default blogRouter