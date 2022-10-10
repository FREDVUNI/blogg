import React,{useState} from "react"
import {Typography,TextField,Button,Box  } from "@mui/material"
import { makeStyles } from '@mui/styles';
import axios from "axios"
import {useNavigate} from "react-router-dom"

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

const AddPost = () =>{
    const classes = useStyles()
    let navigate = useNavigate()

    const [inputs,setInputs] = useState({
        title:"",
        description:"",
        image:""
    })

    const handleChange = (e) =>{
        setInputs((prevState) =>({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const sendRequest = async() =>{
        const res = await axios
        .post(`http://localhost:5002/api/posts/create`,{
            title:inputs.title,
            description:inputs.description,
            image:inputs.image,
            user: localStorage.getItem("userId")
        })
        .catch(err => console.log(err))

        const data = await res.data;
        return data;
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        sendRequest()
        navigate("/posts")
    }

    return(
        <>
        <Box className={classes.width} >
            <form noValidate autoComplete="off" className={classes.formStyle} onSubmit={handleSubmit}>
                <Typography variant="h5" className={classes.grayStyle}>Post</Typography>
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
                <TextField
                    id="image"
                    label="Enter image URL"
                    variant="outlined"
                    fullWidth
                    className={classes.spacing}
                    name="image"
                    value={inputs.image}
                    onChange={handleChange}
                />
                <Button variant="contained" sx={{background: "#2d6ab1",borderRadius:"0px"}} type="submit" className={classes.spacing}>
                   create post
                </Button>
            </form>
        </Box>
        </>
    )
}

export default AddPost