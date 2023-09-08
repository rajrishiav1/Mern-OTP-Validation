import React, { useState } from 'react'
import {useLocation, useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { userVerify} from "../services/Apis"

const Otp = () => {
  const [otp,setOtp] = useState("")
  //console.log(otp);

  const location = useLocation()
  //console.log(location);

  const navigate = useNavigate()

  const LoginUser=async(e)=>{
    e.preventDefault()

    if (otp ==="")
    {
      toast.error("Enter your OTP")
    }
    else if(!/[^a-zA-Z]/.test(otp))
    {
      toast.error("Enter Valid OTP")
    }
    else if(otp.length<6)
    {
      toast.error("OTP length minimum 6 digit")
    }
    else{
      const data ={
        otp,email:location.state
      }

      const response = await userVerify(data)
      if(response.status===200){
        localStorage.setItem("userdbtoken",response.data.userToken)
        toast.success(response.data.message)
        setTimeout(()=>{
            navigate("/dashboard")
        },5000)
      }else{
      
      }toast.error(response.data.error)
    }
    
  }
  return (
   <>
     <section>
        <div className="form_data">
            <div className="form_heading">
                <h1>Welcome to OTP Page</h1>
                <p>Please Enter your OTP for Validation.</p>
            </div>
            <form>  
                <div className="form_input"> 
                    <label htmlFor='otp'>OTP</label>
                    <input type="text" name='otp' onChange={(e)=>setOtp(e.target.value)} id='' placeholder='Enter your OTP '/>
                    <button className='btn' onClick={LoginUser}>Submit</button>
                    
                </div>
            </form>
            
        </div>
        <ToastContainer />
    </section>
   
   </>
  )
}

export default Otp
