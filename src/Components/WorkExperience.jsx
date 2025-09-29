import React, { useState } from 'react'
import { useContext } from 'react';
import { FormContext } from './FormContext';
const WorkExperience = ({handleClose}) => {
  const {setFormData} = useContext(FormContext);
  const [jobtitle,setjobtitle] = useState("");
  const [companyName,setCompanyName] = useState("");
  const [Location,setLocation] = useState("");
  const [yearofexperience,setYearofexperience] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit =()=>{
    if(!jobtitle && !companyName && !Location && !yearofexperience && !description){
      alert("fill out all input spaces")
    }else if(!jobtitle){
      alert("Enter job title input")
    }else if(!companyName){
      alert("Enter company Name input")
    }else if(!Location){
      alert("Enter Comapny Location Input")
    }else if(!yearofexperience){
      alert("Enter year of experience")
    }else if(!description){
      alert("fill in description input")
    }
    const newworkexperienceInfo = {
      jobtitle,
      companyName,
      Location,
      yearofexperience,
      description
    }
    setFormData((prev)=> ({...prev, workexperience: newworkexperienceInfo}))
    setCompanyName("");
    setLocation();
    setYearofexperience();
    setDescription();
    setjobtitle();
    handleClose();
  }
  

  return (
        <div className='border-5 border-blue-900 justify-self-center w-fit p-5  m-5  rounded-2xl'>
         <div className='flex justify-between'>
            <h1 className='font-bold text-[25px] '>Work Experience</h1>
           <h3  className='text-black font-bold text-2xl pt-1 cursor-pointer border-2 w-10 text-center' onClick={handleClose}><ion-icon name="close-outline"></ion-icon></h3>
           </div>

       <div className='flex flex-wrap gap-5'>
           <div>
         <h3 className='text-[20px] '>Job Title<span className='text-[red]'>*</span></h3>
       <input type="text" placeholder='Job Title'
      value={jobtitle}
         onChange={(e)=>{setjobtitle(e.target.value)}} className='p-2 text-black border-2 w-[300px] rounded-2xl border-blue-900 my-2' />

        <h3 className='text-[20px] '>Company Name <span className='text-[red]'>*</span></h3>
       <input type="text" placeholder='Degree' value={companyName}
       onChange={(e)=>{setCompanyName(e.target.value)}}className='p-2 text-black border-2 w-[300px] rounded-2xl border-blue-900 my-2' />

        <h3 className='text-[20px] '>Location <span className='text-[red]'>*</span></h3>
       <input type="text" placeholder='location' value={Location}
         onChange={(e)=>{setLocation(e.target.value)}}className='p-2 text-black border-2 w-[300px] rounded-2xl border-blue-900 my-2' />

       </div>
        <div>
          <h3 className='text-[20px] '>Start Date <span className='text-[red]'>*</span></h3>
       <input type="text" placeholder='Start Date' value={yearofexperience}
         onChange={(e)=>{setYearofexperience(e.target.value)}}className='p-2 text-black border-2 w-[300px] rounded-2xl border-blue-900 my-2' />

        

        <h3 className='text-[20px] '>Description/Responsilities <span className='text-[red]'>*</span></h3>
        <textarea name="" id="" placeholder='Description' value={description}
        onChange={(e)=>{setDescription(e.target.value)}} className='p-2 text-black border-2 w-full rounded-2xl border-blue-900 my-2'></textarea>
        </div>
       </div>
        <div className='justify-self-end'>
         <button className='p-2 w-[120px]  h-fit rounded-2xl bg-blue-900 text-white font-bold cursor-pointer ' onClick={handleSubmit}>Submit</button>
        </div>
       
       </div>
  )
}

export default WorkExperience