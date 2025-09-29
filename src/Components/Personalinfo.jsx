import React, { useContext, useState } from 'react'
import { FormContext } from './FormContext';

const Personalinfo = ({handleClose}) => {
  const { setFormData}=useContext(FormContext)
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [title,setTitle] = useState("");
  const [location,setLocation] = useState("");
  const [social,setSocial] = useState("");

  const handleSubmit =()=>{
    if(!name && !phoneNumber && !email && !title && !location && !social){
      alert("fill out all details")
    }else if(!name ){
      alert("fill in  degree input")
    }else if(!email ){
      alert("fill in  Email input")
    }else if(!title ){
      alert("fill in  Title input")
    }else if(!location ){
      alert("fill in  location input")
    }else if(!social ){
      alert("fill in  socila input")
    }
   else{
     const newPersonalInfo = {
      name,
      email,
      phoneNumber,
      title,
      location,
      social
    }
     setFormData((prev)=>({
      ...prev, personal: newPersonalInfo
     }))
      setName('');
      setTitle("");
      setLocation("");
      setSocial("");
      setPhoneNumber("");
      setEmail("");
      handleClose();
   }
  }
  return (
    <div className='bg-transparent  w-fit p-10 border-5 justify-self-center text-black rounded-2xl mt-5 border-blue-900'>
       
        <div className='flex justify-between'>
            <h1 className='font-bold text-[25px] '>Personal Information</h1>
           <h3  className='text-black font-bold text-2xl pt-1 cursor-pointer border-2 w-10 text-center' onClick={handleClose}><ion-icon name="close-outline"></ion-icon></h3>
           </div>



        <div className='flex flex-wrap gap-5 '>
       <div>
          <h3 className='text-[20px] '> Full Name <span className='text-[red]'>*</span></h3>
       <input type="text" value={name}
          onChange={(e)=>{setName(e.target.value)}}
           placeholder='Name' className='p-2  border-2 w-[300px] rounded-2xl border-blue-900 text-black my-2' />
        
        
        <h3 className='text-[20px] '> Job Title <span className='text-[red]'>*</span></h3>
       <input type="text" placeholder='Job Title'
       value={title}
   onChange={(e)=>{setTitle(e.target.value)}}className='p-2 text-black border-2 w-[300px] rounded-2xl border-blue-900 my-2' />
        
        <h3 className='text-[20px] '>Email Addresss <span className='text-[red]'>*</span></h3>
       <input type="email" placeholder='Email address' value={email}
   onChange={(e)=>{setEmail(e.target.value)}}     className='p-2 text-black border-2 w-[300px] rounded-2xl border-blue-900 my-2' />
      </div>

        <div>
          <h3 className='text-[20px] '>Phone Number <span className='text-[red]'>*</span></h3>
       <input type="tel" name="" id="" placeholder='Phone Number' value={phoneNumber} onChange={(e)=>{setPhoneNumber(e.target.value)}}
   className='p-2 text-black border-2 w-[300px] rounded-2xl border-blue-900 my-2' />
        
        <h3 className='text-[20px] '>Location   <span className='text-[red]'>*</span></h3>
       <input type="text" placeholder='Location'
       value={location}
  onChange={(e)=>{setLocation(e.target.value)}}className='p-2 text-black border-2 w-[300px] rounded-2xl border-blue-900 my-2' />
       
        <h3 className='text-[20px] '>Linkedin profile | portfolio| Github <span className='text-[red]'>*</span></h3>
         <textarea name="" id=""
        value={social} onChange={(e)=>{setSocial(e.target.value)}}
   className='p-2 text-black border-2 w-[300px] rounded-2xl border-blue-900 my-2'></textarea>
        </div>
        </div>
        
        
        
        
        
        
        
        
        
         <div className='justify-self-end'>
         <button className='p-2 w-[120px]  h-fit rounded-2xl bg-blue-900 text-white font-bold  ' onClick={handleSubmit} >Submit</button>
        </div>

    </div>
  )
}

export default Personalinfo