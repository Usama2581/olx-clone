import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";
import './header.css'
import swal from 'sweetalert';

function Header() {

  const navigate = useNavigate();

  const signout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      swal("logged out" ,"", "success")
      setTimeout(() => {
        navigate("/login")
      }, 3000);
    }).catch((e) => {
      // alert(e.message)
      swal(e.message,"", "error")
    });
  }

  return (
    <header>
      <h1>olx</h1>
      <nav>
        
        <li><p onClick={() => navigate('/home')}>Home</p></li>
        <li><p onClick={() => navigate('/profile')}>Profile</p></li>
        <li><p onClick={() => navigate('/myads')}>My ads</p></li>
        <li><p onClick={() => navigate('/ads')}>Post Ad</p></li>
        <li><p onClick={signout}>Logout</p></li>
        
      </nav>
    </header>
  )
}

export default Header