import React,{useEffect,useState} from "react"
// import { useSelector } from "react-redux"
import axios from "axios"
import PostCard from "./PostCard"

const Posts = () =>{
    const [posts,setPosts] = useState([])

    const getPosts = async () =>{
        const res = await axios
        .get("http://localhost:5002/api/posts")
        .catch((error)=>{
            console.log(error.message)
        })
        const data = await res.data
        return data;

    }
    useEffect(()=>{
        getPosts().then((data) => setPosts(data.posts))
    },[])

    // console.log(posts[0].user)

    return(
        <div>
            {
                posts && posts.map((post,index) =>
                <PostCard isUser={localStorage.getItem("userId") === posts[0].user._id} key={index} post={post} user={posts[0].user} id={post._id}/>
            )}
        </div>
    )
}

export default Posts