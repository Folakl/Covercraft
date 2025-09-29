import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { supabase } from '../SupabaseClient';
import { useContext } from 'react';
import { FormContext} from '../Components/FormContext';
import Resetpassword from '../Components/Resetpassword';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showpassword,setShowpassword] = useState(false);
  const [resetoverlay,setResetoverlay] = useState(false)
  const {setIsloggedin} = useContext(FormContext)
  const [loading,setLoading] = useState(false)


  
  const navigate = useNavigate();
  const handleShowpassword = ()=>{
    setShowpassword(!showpassword)
  }
 
 const handleLogin = async () => {
  setLoading(true);
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;

    if (user) {
      // fetch profile from profiles table
      const { data: profile, error: profileError } = await supabase
        .from("profile")
        .select("*")
        .eq("id", user.id) // id must match auth.users.id
     

      if (profileError) {
        console.error("Error fetching profile:", profileError.message);
      } else {
        console.log("Fetched profile:", profile);

        // If you want to store profile in context:
        // setProfile(profile);
        setIsloggedin(true);
        navigate("/");
       
      }
    }
  } catch (err) {
    console.error("Unexpected error:", err.message);
    alert("Something went wrong, try again.");
  } finally {
    setLoading(false); // ✅ only used to toggle the spinner back off
  }
};


  const HandleResetpassword=()=>{
    setResetoverlay(!resetoverlay)
  }
  const handleoutsideclick=()=>{
    setResetoverlay(false)
  }
  const handleinsideclick=(e)=>{
    e.stopPropagation();
  }
  return (
   <div className='pt-20'>
    <h3 className='text-center font-bold text-[30px] mt-2 '>Welcome to Covercraft</h3>
     <div className='bg-blue-950 text-white text-start  font-bold w-fit justify-self-center  lg:px-20 px-5 md:px-10  py-[50px] mt-5 rounded-2xl'>
     <h3 className='py-2 pl-2'>Email</h3>
     <input type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} className='w-[250px] h-[40px] px-3 border-2 rounded-2xl outline-none ' placeholder='Enter your Email' />
     <h3 className='py-2'>Password</h3>
    
    <div className='relative' >
      <input type={showpassword ? "text": "password"} value={password}  onChange={(e)=>{setPassword(e.target.value)}}  className='w-[250px] h-[40px] px-3 border-2 rounded-2xl outline-none relative' placeholder='Enter your Password' /> 
      <h3 className='absolute top-2 left-[210px] my-1  cursor-pointer text-white' onClick={handleShowpassword}  >
       {showpassword ? (<ion-icon name="eye-off-outline"></ion-icon>) : (<ion-icon name="eye-outline"></ion-icon>)}

      </h3>
      </div>

      <div className='flex justify-center'>
          {
            loading ? (
              <button className='font-bold text-black my-5 bg-white  w-[120px] outline-none h-fit py-2 rounded-2xl cursor-progress' >Logging in</button> 
            ):
            (
              <button className='font-bold text-black my-5 bg-white  w-[120px] outline-none h-fit py-2 rounded-2xl cursor-pointer' onClick={handleLogin}>Log in</button> 
            )
          }
      </div>
      <div className='text-center'><h3>Forgot Password <span className='text-blue-500 underline cursor-pointer' onClick={HandleResetpassword}>reset here</span></h3></div>
   </div>

   {
    resetoverlay && (
      <div className=' bg-black/50 inset-0 fixed z-50 flex justify-center items-center top-0 bg-full cursor-pointer' onClick={handleoutsideclick}>
      
         <div className='bg-blue-950 rounded-md p-5  ' onClick={handleinsideclick}>
           <Resetpassword/>
         </div>
       
      </div>
    )
   }

        </div>
  )
}

export default Login