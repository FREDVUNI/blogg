import React,{useState} from "react"
import {AppBar,Typography,Toolbar,Box,Button,Tabs,Tab } from "@mui/material"
import {Link} from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { authActions } from "../store"

const Header = () =>{
    const [value,setValue] = useState()
    const isLoggedIn = useSelector((state) => state.isLoggedIn)
    const dispatch = useDispatch() 

    return(
        <AppBar position="sticky" style={{
            margin: "0",
            padding:"8px 10px",
            background: "#2d6ab1",
            borderWwidth:"0 0 1px",
            boxShadow:"none",
        }}>
            <Toolbar>
                <Typography variant="h5">Full stack</Typography>
                { isLoggedIn && (
                <Box display="flex" marginLeft="auto" marginRight="auto">
                    <Tabs textColor="inherit" value={value} onChange={(e,val) => setValue(val)}>
                        <Tab LinkComponent={Link} to="/posts" label="posts"/>
                        <Tab LinkComponent={Link} to="/profile/posts" label="Your posts"/>
                        <Tab LinkComponent={Link} to="/post/create" label="Add post"/>
                    </Tabs>
                </Box>
                )}
                <Box display="flex" marginLeft="auto">
                    { !isLoggedIn && (
                        <>
                            <Button LinkComponent={Link} to="/auth" sx={{margin:"1",color: 'white', display: 'block'}}>Login</Button>
                            <Button LinkComponent={Link} to="/auth" sx={{margin:"1",color: 'white', display: 'block'}}>Sign up</Button> 
                        </>
                    )}
                    { isLoggedIn && (
                        <Button sx={{margin:"1",color: 'white', display: 'block'}}
                            LinkComponent={Link} to="/auth"
                            onClick={() => dispatch(authActions.logout())}
                        >
                            Logout
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header