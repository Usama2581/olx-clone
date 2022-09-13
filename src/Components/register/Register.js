import React, { useState } from 'react'
import { register } from '../../config/Firebase'
import { useNavigate } from 'react-router-dom'
import './register.css'
import swal from 'sweetalert'

function Register() {

  let [form, setForm] = useState({})
  const navigate = useNavigate()


  const updateForm = (e, key) => {
    setForm({ ...form, [key]: e.target.value })
  }

  const signup = async () => {
    try {
      await register(form)
      swal("registered successfully", "", "success")
      navigate('/login')
    } catch (e) {
      swal(e.message, "", "error")
    }
  }
  return (
    <div className="reg-main">
      <div className="form">
        <h1>Register</h1>
        <div className="inputbox">
          <input type="text" onChange={(e) => updateForm(e, "name")} required />
          <label>Name</label>
        </div>
        <div className="inputbox">
          <input type="email" onChange={(e) => updateForm(e, "email")} required />
          <label>Email</label>
        </div>
        <div className="inputbox">
          <input type="password" onChange={(e) => updateForm(e, "password")} required />
          <label>Password</label>
        </div>
        <div className="inputbox">
          <input type="tel" onChange={(e) => updateForm(e, "age")} required />
          <label>Age</label>
        </div>
        <div id="inputbox">
          <input
            type="radio"
            name="radio"
            onChange={(e) => updateForm(e, "gender")}
            value="male"
          />
          <label>Male</label>
          <input
            name="radio"
            type="radio"
            onChange={(e) => updateForm(e, "gender")}
            value="female"
          />
          <label>Female</label>
        </div>
        <div className="action">
          <button onClick={signup} className="register">
            Register
          </button>
          <div className="switch">
            <p>Already have an account?</p>
            <button
              onClick={() => navigate("/login")}
              className="login"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register