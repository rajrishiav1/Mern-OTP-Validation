import React, { useState } from 'react'
import "../styles/mix.css"
import { ToastContainer, toast } from 'react-toastify';
import {NavLink, useNavigate} from "react-router-dom"
import { registerfunction} from '../services/Apis';


const Register = () => {

 const[passShow,setPasShow]= useState(false)
 const[inputData,setInputData]=useState({
  fname:"",
  email:"",
  password:""
 })    
 
 const navigate = useNavigate()

 //setInputValue
 const handleChange =(e)=>{
 const{name,value}=e.target;
  setInputData({...inputData,[name]:value})
 }
 //console.log(inputData);


 //RegisterData

 const handleSubmit=async(e)=>{
  e.preventDefault()
  const{fname,email,password}=inputData
  if(fname==="")
  {
    toast.error("Please Enter your Name")
  }else if(email ==="")
  {
    toast.error("Please Enter Your Email")
  }else if(!email.includes("@"))
  {
    toast.error("please enter valid email ")
  }else if(password==="")
  {
    toast.error("plaese enter password")
  }else if(password.length < 6)
  {
    toast.error("password must be 6 character")
  }
  else {
    const response = await registerfunction(inputData)
    if(response.status === 200)
    {
      setInputData({...inputData,fname:"",email:"",password:""})
      navigate("/") 
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
                <h1>Welcome to Registration Page</h1>
                <p style={{textAlign:"center"}}>Hi, RRCloud Welcomes You. Please Register Yourself.</p>
            </div>
            <form>  
                <div className="form_input"> 
                <label htmlFor='fname'>Name</label>
                    <input type="text" name='fname' id='' onChange={handleChange} placeholder='Enter your Full Name'/>
                    </div>


                    <div className="form_input"> 
                    <label htmlFor='email'>Email</label>
                    <input type="email" name='email' id='' onChange={handleChange} placeholder='Enter your Email Address'/>
                    </div>

                    <div className="form_input"> 
                    <label htmlFor='password'>Password</label>

                    <div className="two">
                    <input type={!passShow ?"password" : "text"} name='password' id='' onChange={handleChange} placeholder='Enter your Password'/>
                    <div className="showpass"   onClick={()=>setPasShow(!passShow)}>
                    {!passShow ? "Show" :"Hide"}
                    </div>
                    </div>
                    
                    </div>

                    <button className='btn' onClick={handleSubmit} >SignIn</button>
                    <p>Already Have an Account?  <NavLink to='/'> Login</NavLink> here</p>
                
            </form>
            
        </div>
        <ToastContainer />
    </section>
   
   </>
  )
}

export default Register
