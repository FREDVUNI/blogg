import React,{useState,useEffect} from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import {Typography,TextField,Button,Box  } from "@mui/material"
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom"

const useStyles = makeStyles({
    width:{
        maxWidth:"500px",
        padding:"5px",
        alignItems:"center",
        justifyContent:"center",
        margin:"auto",
        boxShadow:"5px 5px 7px #ccc",
        marginTop:"15px"
    },
    formStyle:{
        margin:"0px auto",
        padding:"30px"
    },
    spacing:{
        marginTop:"20px !important",
    },
    grayStyle:{
        color:"#8f8f8f"
    }
})

const EditPost = () =>{
    const [post,setPost] = useState([])    
    const id = useParams().id
    const classes = useStyles()
    const navigate = useNavigate()

    const [inputs,setInputs] = useState({})

    const handleChange = (e) =>{
        setInputs((prevState) =>({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const getPost =async() =>{
        const res = await axios
        .get(`http://localhost:5002/api/posts/${id}`)
        .catch((error) => console.log(error))
        const data = await res.data;
        return data;
    }

    useEffect(()=>{
        getPost().then((data) => {
            setPost(data.post)
            setInputs({
                title:post.title,
                description:post.title,
            })
        })
    },[post.title])

    const sendRequest = async() =>{
        const res = await axios
        .put(`http://localhost:5002/api/posts/update/${id}`,{
            title:inputs.title,
            description:inputs.description,
        })
        .catch(err => console.log(err))

        const data = await res.data;
        return data;
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        // console.log(inputs)
        sendRequest()
        .then((data) => console.log(data))
        .then(()=> navigate("/profile/posts"))
    }

    // console.log(post)
    return(
        <>
        {
            inputs &&
            <Box className={classes.width} >
            <form noValidate autoComplete="off" className={classes.formStyle} onSubmit={handleSubmit}>
                <Typography variant="h5" className={classes.grayStyle}>Edit Post</Typography>
                <TextField
                    id="title"
                    label="Enter post title"
                    variant="outlined"
                    fullWidth 
                    autoFocus
                    className={classes.spacing}
                    name="title"
                    value={inputs.title}
                    onChange={handleChange}
                />
                <TextField
                    id="description"
                    type="text"
                    label="Enter description"
                    variant="outlined"
                    fullWidth
                    className={classes.spacing}
                    name="description"
                    value={inputs.description}
                    onChange={handleChange}
                />
                <Button variant="contained" sx={{background: "#2d6ab1",borderRadius:"0px"}} type="submit" className={classes.spacing}>
                   update post
                </Button>
            </form>
        </Box>
        }
        </>
    )
}

export default EditPost