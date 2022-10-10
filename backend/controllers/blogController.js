import mongoose from "mongoose"
import Blog from "../models/Blog.js"
import User from "../models/Users.js"

export const getBlogs = async(req,res,next) =>{
    try{
        let posts = await Blog.find().populate("user")
        if(posts){
            return res.status(200).json({posts})
        }else{
            return res.status(404).json({message:"No posts were found."})
        }
    }
    catch(error){
        console.log(error.message)
    }
}

export const addPost = async(req,res,next) =>{
    const {title,description,image,user} = req.body

    let existing;
    try{
        existing = await User.findById(user)
    }
    catch(err){
        return console.log(err)
    }

    if(!existing) return res.status(400).json({message: "couldnot find user with this Id"})

    let blog = new Blog({
        title:title,
        description:description,
        image:image,
        user:user,
    })

    try{
        const session = await mongoose.startSession();
        // session.startTransaction();
        await blog.save({session})
        existing.blogs.push(blog)
        await existing.save({session})
        // await session.commitTransaction()
    }
    catch(err){
        return console.log(err)
    }

    return res.status(200).json({ blog })
}

export const postById = async(req,res,next) =>{
    try{

        let id = req.params.id
        if(!id) res.status(404).json({message:"The post was not found."})

        let post = await Blog.findById(id)

        if(!post) res.status(404).json({message:"The post was not found."})
        res.status(200).json({post})

    }
    catch(error){
        console.log(error.message) 
    }
}

export const updatePost = async(req,res,next) =>{
    try{
        const {title,description} = req.body
        let id = req.params.id
        if(!id) res.status(404).json({message:"The post was not found."})

        let post = await Blog.findByIdAndUpdate(id,{
            title,description
        },{new:true})

        if(!post) res.status(400).json({message:"Failed to update post."})
        res.status(200).json({post})

    }
    catch(error){
        console.log(error.message) 
    }
}

export const deletePost = async(req,res,next) =>{
    try{
        let id = req.params.id
        if(!id) res.status(404).json({message:"The post was not found."})

        //remove blog posts from users on deleting the blog
        let post = await Blog.findByIdAndRemove(id).populate("user")
        await post.user.posts.pull(post)
        await post.user.save()

        if(!post) res.status(400).json({message:"Failed to delete post."})
        res.status(200).json({message:"success"})

    }
    catch(error){
        console.log(error.message) 
    }
}

//userId gets you all their posts
export const userById = async(req,res,next) =>{
    try{
        let userId = req.params.id
        if(!userId) res.status(404).json({message:"The user was not found."})
        let posts = await User.findById(userId).populate("blogs")

        if(!posts) res.status(404).json({message:"The posts were not found."})
        res.status(200).json({user:posts})
    }
    catch(error){
        console.log(error.message) 
    }

}