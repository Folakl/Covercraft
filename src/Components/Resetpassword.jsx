import React from 'react'
import { useState } from 'react'

const Resetpassword = () => {

  const [email,setEmail] = useState("");

  const handleReset=()=>{
    if(email === ""){
      alert("enter your email to reset password")
    }
   alert("email sucessfully sent, check your email for password reset confirmation link")
  }
  return (
    <div className='flex justify-center items-center '>
        <div className='w-[300px] p-5  h-fit border-4 border-white  text-white rounded-2xl '>
            <h3 className='text-center '>Enter your Email Address to reset password</h3>
           <div className='mt-2 mb-4'>
            <h3 className='py-2'>Email</h3>
              <input type="email" value={email} onChange={(e)=>{setEmail(e.target.email)}} className='w-[250px] h-fit  outline-none px-3 py-1  border-2 rounded-2xl border-white text-white' placeholder='Enter your email address' />
           </div>
           <button className='text-blue-950 hover:text-blue-500 rounded-2xl p-1 w-[150px] h-[40px] bg-white outline-none cursor-pointer' onClick={handleReset}>Reset</button>
        </div>        
    </div>
  )
}

export default Resetpassword