import React,{useState,useEffect} from "react"
import axios from "axios"
import PostCard from "./PostCard"

const UserPosts = () =>{
    const id = localStorage.getItem("userId")
    const [user,setUser] = useState([])

    const sendRequest = async () =>{
        const res = await axios
        .get(`http://localhost:5002/api/posts/user/${id}`) 
        .catch((err) => console.log(err.message))
        const data = await res.data
        return data;
    }

    useEffect(() =>{
        sendRequest()
        .then((data) => setUser(data.user))
        // eslint-disable-next-line
    },[])

    // console.log(user)

    return(
        <div>
            { user && user.blogs && user.blogs.map((post,index) => 
                <PostCard isUser={true} key={index} post={post} user={user} id={post._id}/>
            )}

        </div>
    )
}

export default UserPosts