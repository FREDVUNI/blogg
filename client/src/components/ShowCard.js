import React from "react"
import { Typography,Card,CardContent,CardMedia,CardHeader,Avatar  } from "@mui/material"


const ShowCard = ({post}) =>{

    return( 
        <div>
            <Card sx={{ width:"50%", margin:"auto", mt:2, padding:2,boxShadow:"5px 5px 7px #ccc",":hover:":{
                boxShadow:"10px 10px 15px #ccc",
            }}}>
                <CardHeader
                    avatar ={
                        <Avatar sx={{bgcolor:"red"}} aria-label="post">
                            
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
                        { post.description}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default ShowCard