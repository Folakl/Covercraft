import React, { useState } from 'react'
import { useContext } from 'react'
import { FormContext } from './FormContext'

const Education = ({handleClose}) => {
  const {setFormData} = useContext(FormContext)
  const [degree,setDegree] = useState('');
  const [institutionName,setInstitutionName] = useState("");
  const [Location,setLocation] = useState("")
  const [startDate,setStartDate] = useState("");
  const [endDate,setEndDate] = useState('');

  const handleSubmit =()=>{
    if(!degree && !institutionName && !Location && !startDate && !endDate){
      alert("fill out all input spaces")
      
    }else if(!degree ){
      alert("fill in  degree input")
    }else if(!institutionName ){
      alert("fill in  institution input")
    }else if(!Location ){
      alert("fill in Location input")
    }else if(!startDate){
      alert("fill in start Date input")
    }else if(!endDate){
      alert("fill in End Date input")
    }else{
      const newEducationinfo = {
      degree,
      institutionName,
      Location,
      startDate,
      endDate
    }
     setFormData((prev) => ({
    ...prev,
    education: newEducationinfo,  // store directly
     }));
     setDegree("");
     setInstitutionName("");
     setLocation("");
     setStartDate("");
     setEndDate("");
     handleClose();
    }
    
  }
 
  return (
    <div className='bg-transparent w-fit p-5 border-5 justify-self-center  rounded-2xl mt-5 border-blue-900'>
        <h1 className='font-bold text-[25px]'>Education Background</h1>
        <div className='flex gap-2'>
            <div>
          <h3 className='text-[20px] '>Degree <span className='text-[red]'>*</span></h3>
       <input type="text" placeholder='Degree' 
       value={degree}
          onChange={(e)=>{setDegree(e.target.value)}}
           className='p-2 text-black border-2 w-[300px] rounded-2xl border-blue-900 my-2' />
        
        <h3 className='text-[20px] '>Institution Name <span className='text-[red]'>*</span></h3>
       <input type="text" placeholder='institution' 
         value={institutionName}
          onChange={(e)=>{setInstitutionName(e.target.value)}} className='p-2 text-black border-2 w-[300px] rounded-2xl border-blue-900 my-2' />
        </div>
       
        <div>
          <h3 className='text-[20px] '>Location<span className='text-[red]'>*</span></h3>
       <input type="text" placeholder='location'
      value={Location}
       onChange={(e)=>{setLocation(e.target.value)}} className='p-2 text-black border-2 w-[300px] rounded-2xl border-blue-900 my-2' />

        <h3 className='text-[20px] '>Start Date <span className='text-[red]'>*</span></h3>
       <input type="tel" placeholder='Start Date'  className='p-2 text-black border-2 w-[300px] rounded-2xl border-blue-900 my-2' 
        value={startDate}
         onChange={(e)=>{setStartDate(e.target.value)}}
       />
        </div>
        </div>
      

        <h3 className='text-[20px] '>End Date <span className='text-[red]'>*</span></h3>
       <input type="tel" placeholder='End Date'
       value={endDate}
         onChange={(e)=>{setEndDate(e.target.value)}} className='p-2 text-black border-2 w-[300px] rounded-2xl border-blue-900 my-2' />
        <div className='justify-self-end'>
         <button className='p-2 w-[120px]  h-fit rounded-2xl bg-blue-900 text-white font-bold  ' onClick={handleSubmit}>Submit</button>
        </div>
       

    </div>
  )
}

export default Education