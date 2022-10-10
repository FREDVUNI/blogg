import React,{useState,useEffect} from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import ShowCard from "./ShowCard"

const Post = () =>{
    const [post,setPost] = useState([])    
    const id = useParams().id

    const getPost = async() =>{
        const res = await axios
        .get(`http://localhost:5002/api/posts/${id}`)
        .catch((error) => console.log(error))
        const data = await res.data;
        return data; 
    }
  
    useEffect(()=>{
        getPost().then(data => setPost(data.post))
        // eslint-disable-next-line
    },[]) 

    // console.log(post)
    return(
        <div>
            <ShowCard post={post}/>
        </div>
    )
}

export default Post