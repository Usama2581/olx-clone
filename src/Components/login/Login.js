import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import { fbLogin, login } from '../../config/Firebase'
import './Login.css'


function Login() {

    let [form, setForm] = useState({})
    const navigate = useNavigate()


    const updateForm = (e,key) => {
        setForm({...form, [key] : e.target.value})
    }

    const signin = async () => {
        try {
            let {email, password} = form
            await login(email, password)
            swal("Successfully logged in", "","success")
            navigate('/home')
        } catch (e) {
            // swal(e.message)
            swal(e.message, "", "error")
        }
    }

    const fblogin = async () => {
        try {
            await fbLogin()
            alert("sign in")
        } catch (e) {
            alert(e.message)
        }
    }
    return (
        <div className='log-main'>
            <div className='form'>
                <h1>LOGIN</h1>
                <div className='inputbox'>
                    <input type='email' onChange={(e) => updateForm(e, 'email')} required />
                    <label>Email</label>
                </div>
                <div className='inputbox'>
                    <input type='password' onChange={(e) => updateForm(e, 'password')} required />
                    <label>Password</label>
                </div>
                <div className='action'>
                    <button onClick={signin} className='login' >Login</button>
                    <div className='switch'>
                        <p>Don't have an account? </p>
                        <button onClick={() => navigate("/register")} className='register'>Register</button>
                        <button onClick={fblogin}>Fb login</button>
                    </div>
                </div>
            </div>
        </div>
    )
    }

export default Login