import React,{useEffect} from "react"
import './App.css';
import Header from "./components/Header"
import Auth from "./components/Auth"
import Post from "./components/Post"
import Posts from "./components/Posts"
import UserPosts from "./components/UserPosts"
import AddPost from "./components/AddPost"
import EditPost from "./components/EditPost"
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux"
import {authActions} from "./store"

function App() {
  const isLoggedIn = useSelector(state=>state.isLoggedIn)
  // console.log(isLoggedIn)
  const dispatch = useDispatch()

  useEffect(()=>{
      if(localStorage.getItem("userId")){
        dispatch(authActions.login())
      }
  },[dispatch])

  return (
    <>
    <Router>
      <header>
        <Header/>
      </header>
      <main>
        <Routes>
          {! isLoggedIn ? <Route path="/auth" element={<Auth/>}/> :
          <>
            <Route path="/posts" element={<Posts/>}/>
            <Route path="/profile/posts" element={<UserPosts/>}/>
            <Route path="/post/create" element={<AddPost/>}/>
            <Route path="/post/:id" element={<Post/>}/>
            <Route path="/post/:id/edit" element={<EditPost/>}/>
          </>
          }
        </Routes>
      </main>
    </Router>
    </>
  );
}

export default App;
