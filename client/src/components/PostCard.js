import React from "react"
import { Typography,Card,CardContent,CardMedia,CardHeader,Avatar,Box,IconButton  } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom"
import axios from "axios"

const PostCard = ({post,user,isUser,id}) =>{
    let navigate = useNavigate()

    const showPost = () =>{
        // console.log(id)
        navigate(`/post/${id}`)
    }

    const handleEdit = () =>{
        // console.log(id)
        navigate(`/post/${id}/edit`)
    }

    const deleteRequest = async () =>{
        const res = await axios
        .delete(`http://localhost:5002/api/posts/delete/${id}`)
        .catch(err => console.log(err))

        const data = await res.data;
        return data;
    }

    const handleDelete = (e) =>{
        e.preventDefault()
        deleteRequest()
        .then((data) => console.log(data))
    }

    return(
        <div>
            <Card sx={{ width:"40%", margin:"auto", mt:2, padding:2,boxShadow:"5px 5px 7px #ccc",":hover:":{
                boxShadow:"10px 10px 15px #ccc",
            }}}>
                {isUser && (
                    <Box display="flex">
                        <IconButton sx={{ marginLeft: "auto" }}>
                            <VisibilityIcon onClick={showPost}/>
                        </IconButton>
                        <IconButton>
                            <EditIcon onClick={handleEdit}/>
                        </IconButton>
                        <IconButton>
                            <DeleteIcon onClick={handleDelete}/>
                        </IconButton>
                    </Box>
                )}
                <CardHeader
                    avatar ={
                        <Avatar sx={{bgcolor:"red"}} aria-label="post">
                            {user.username ? user.username.charAt(0) :"" }
                        </Avatar>
                    }
                    title={post.title}
                    subheader= {new Date(post.date).toLocaleString()}
                />
                <CardMedia
                    component ="img"
                    height="194"
                    image={post.image}
                    alt="image"
                />
                <CardContent>
                    <Typography>
                        <strong>{user.username}</strong>{" : " + post.description}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default PostCard