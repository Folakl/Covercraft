import React from 'react'
import { useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { supabase } from '../SupabaseClient';
import Navbar from '../Components/Navbar';
const Signup= () => {
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [name,setName] = useState('');
  const [showpassword,setShowpassword] = useState(false);
   const [loading,setLoading] = useState(false);
  

  
  const navigate = useNavigate();
  const handleShowpassword = ()=>{
    setShowpassword(!showpassword)
  }
const handleSignup = async () => {
setLoading(true);
try{
    const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {data: {name}}//also stored in metadata
  });

  if (error) {
    alert(error.message);
    return;
  }

  const user = data.user;

  if (user) {
    // insert into profiles table
    const { error: profileError } = await supabase.
        from("profile")
        .insert([
          {
          id: user.id,      // must match auth.users.id
           email: user.email ,
           name: name 
           
          },
    ]);

    if (profileError) {
      console.error("Error inserting profile:", profileError.message);
    } else {
      console.log("Profile created for:", user.email);
    }
  }

  // setUser(user);
  alert("Signup successful! Check your email for confirmation.");
  navigate("/login");
}
catch(error){
  alert("unexpected Error,pls try again");
  console.error("unesxpectes error:", error);
  
 
}
finally{
  setLoading(false)
}
};

  const handleSignin=()=>{
    navigate("/login")
  }
 
  return (
   <div className=''>
    <h3 className='text-center font-bold text-[30px] pt-20  '>Welcome to Covercraft</h3>
     <div className='bg-blue-950 text-white text-start  font-bold w-fit justify-self-center  lg:px-20 px-5 md:px-10 py-[30px] mt-5 rounded-2xl'>
     <h3 className='py-2 pl-2'>Name</h3>
     <input type='text' value={name} onChange={(e)=>{setName(e.target.value)}} className='w-[250px] h-[40px] px-3 border-2 rounded-2xl outline-none ' placeholder='Enter your Name' />
     
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
              <button className='font-bold text-black my-5 bg-white  w-[120px] outline-none h-fit py-2 rounded-2xl cursor-progress' >Sign up</button> 
            ): (<button className='font-bold text-black my-5 bg-white  w-[120px] outline-none h-fit py-2 rounded-2xl cursor-pointer' onClick={handleSignup}>Sign up</button> )
          }
   
 
    </div>
    <div className='flex justify-end'>
            <h2>Already have an account <span className='underline text-blue-500 cursor-pointer' onClick={handleSignin}>Sign in</span></h2>
    </div>
   </div>
    
        </div>
  )
}

export default Signup