import React, { useState } from 'react'
import "../styles/mix.css"
import {NavLink, useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { sendOtpFunction } from '../services/Apis';
import Spinner from 'react-bootstrap/Spinner';

const Login = () => {

    const[email,setEmail]=useState("")
    //console.log(email);

    const[spiner,setSpiner]=useState(false)
    const navigate = useNavigate()

    //send Otp
    const sendOtp= async(e)=>{
        e.preventDefault();
        if(email=== "")
        {
            toast.error("Enter your Email !")

        }
        else if(!email.includes("@"))
        {
            toast.error("Enter Valid Email Address !")
        }
        else{
            setSpiner(true)
            const data = {
                email:email 
            }
            const response= await sendOtpFunction(data)
           // console.log(response);
           if(response.status===200)
           {
            setSpiner(false)
            navigate("/user/otp",{state:email})
           }else{
            toast.error(response.response.data.error)
           }
        }
    }
  return (
    <>
    <section>
        <div className="form_data">
            <div className="form_heading">
                <h1>Welcome Back to Login Page</h1>
                <p>Hi, we glad you  are back,Please Login.</p>
            </div>
            <form>  
                <div className="form_input"> 
                    <label htmlFor='email'>Email</label>
                    <input type="email" name='email' id=''onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your Email Address'/>
                    <button className='btn' onClick={sendOtp} >Login
                    {
                    spiner ? <span> <Spinner animation="border" role="status"></Spinner></span>:""
    }
                    </button>
                    <p>Don't have an account ?<NavLink to='/register'> Sign  up</NavLink> </p>
                </div>
            </form>
            
        </div>
        <ToastContainer />
    </section>
    </>
  )
}

export default Login
