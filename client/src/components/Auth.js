import React,{useState} from "react"
import {Typography,TextField,Button,Box  } from "@mui/material"
import { makeStyles } from '@mui/styles';
import axios from "axios"
import { useDispatch } from "react-redux"
import { authActions } from "../store"
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

const Auth = () =>{
    const classes = useStyles()
    const [signUp,setSignUp] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [inputs,setInputs] = useState({
        username:"",
        email:"",
        password:""
    })

    const handleChange = (e) =>{
        setInputs((prevState) =>({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const sendRequest = async(type="login") =>{
        const res = await axios
        .post(`http://localhost:5002/api/users/${type}`,{
            username:inputs.username,
            email:inputs.email,
            password:inputs.password
        })
        .catch((err) => console.log(err.message));

        const data = await res.data;
        return data;
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(signUp){
            sendRequest("signup")
            .then((data) => localStorage.setItem("userId",data.user._id))
            .then(() => dispatch(authActions.login()))
            .then(()=> navigate("/posts"))
        }else{
            sendRequest("login")
            .then((data) => localStorage.setItem("userId",data.user._id))
            .then(() => dispatch(authActions.login()))
            .then(()=> navigate("/posts"))
        }
    }

    return(
        <Box className={classes.width} >
            <form noValidate autoComplete="off" className={classes.formStyle} onSubmit={handleSubmit}>
                <Typography variant="h5" className={classes.grayStyle}>{signUp ? "sign up" : "sign in"}</Typography>
                {signUp &&
                <TextField
                    id="enter-name"
                    label="Enter user name"
                    variant="outlined"
                    fullWidth
                    autoFocus
                    className={classes.spacing}
                    name="username"
                    value={inputs.username}
                    onChange={handleChange}
                />
                }{""}
                <TextField
                    id="enter-email"
                    type="email"
                    label="Enter email address"
                    variant="outlined"
                    fullWidth
                    autoFocus
                    className={classes.spacing}
                    name="email"
                    value={inputs.email}
                    onChange={handleChange}
                />
                <TextField
                    id="enter-password"
                    type="password"
                    label="Enter password"
                    variant="outlined"
                    fullWidth
                    className={classes.spacing}
                    name="password"
                    value={inputs.password}
                    onChange={handleChange}
                />
                <div sx={{ display:"flex" }}>
                    <Button variant="contained" sx={{background: "#2d6ab1",borderRadius:"0px"}} type="submit" className={classes.spacing}>
                        {signUp ? "sign up" : "sign in"}
                    </Button>
                    <Button onClick = {() => setSignUp(!signUp)} className={classes.spacing} sx={{marginLeft:"25px" }}>
                        {signUp ? "login" : "sign up"}
                    </Button>
                </div>
            </form>
        </Box>
    )
}

export default Auth