import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "../Components/login/Login";
import Register from "../Components/register/Register";
import React, { useEffect, useState } from 'react'
import Home from "../Components/home/Home";
import Ads from "../Components/Createad/Ads";
import Profile from "../Components/Profile/Profile";
import Details from "../Components/Details/Details";
import Myads from "../Components/My ads/Myads";
import { getAuth } from "firebase/auth";




function Routerr() {
  const [user, setUser] = useState()

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setUser(user)
      console.log(user)
    } else {
      setUser(user)
      console.log(user)
    }
  }, [])


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/ads' element={<Ads />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/home' element={<Home />} />
        <Route path='/details/:adId' element={<Details />} />
        <Route path='/myads' element={<Myads />} />
      </Routes>
    </Router>
  )
}


export default Routerr
