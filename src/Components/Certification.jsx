import React, { useContext } from 'react'
import { useState } from 'react'
import { FormContext } from './FormContext';

const Certification = ({handleClose}) => {
const {setFormData} = useContext(FormContext);
 const [name,setName] = useState("");
 const [dateissued, SetDateissued] = useState("");
 const [organization, setOrganization] = useState("");
 const [description,setDescription] = useState("");
 

    
  const handleSubmit=()=>{
    if(!name && !organization && !dateissued && !description ){
      alert("fill all input section")
    }else if(!organization ){
      alert("fill in  organization input")
    }else if(!dateissued ){
      alert("fill in  date issued input")
    }else if(!description ){
      alert("fill in description input")
    }else if(!name){
      alert("fill in name input")
    }else{
       const newcertificationinfo = {                         
        name,
        dateissued,
        organization,
        description
      }
    
      setFormData((prev) => ({
    ...prev,
    certification: newcertificationinfo,  // store directly
     }));

     setName("");
     setOrganization('');
     setDescription('');
     SetDateissued('');
     handleClose();
    }
       
   
  }
  return (
   <div >
           <div className='flex justify-between'>
            <h1 className='font-bold text-[25px] '>Certification/ Awards</h1>
           <h3  className='text-black font-bold text-2xl pt-1 cursor-pointer border-2 w-10 text-center' onClick={handleClose}><ion-icon name="close-outline"></ion-icon></h3>
           </div>
        <h3 className='text-[20px] '>Certification/Award Name <span className='text-[red]'>*</span></h3>
       <input type="text" 
       value={name} 
       onChange={(e)=>{setName(e.target.value)}}
       className='p-2 text-black border-2 w-full rounded-2xl border-blue-900 my-2'  name="" id="" />
        
        <h3 className='text-[20px] '>Issuing Organization<span className='text-[red]'>*</span></h3>
       <input type="text"
       value={organization}
         onChange={(e)=>{setOrganization(e.target.value)}} className='p-2 text-black border-2 w-full rounded-2xl border-blue-900 my-2'  name="" id="" />      
        
        <h3 className='text-[20px] '>Date Issued<span className='text-[red]'>*</span></h3>
       <input type="text" 
        value={dateissued} onChange={(e)=>{SetDateissued(e.target.value)}}
           className='p-2 text-black border-2 w-full rounded-2xl border-blue-900 my-2'  name="" id="" />

        <h3 className='text-[20px] '>Description <span className='text-[red]'>*</span></h3>
       <input type="text"
       value={description} onChange={(e)=>{setDescription(e.target.value)}}
        className='p-2 text-black border-2 w-full rounded-2xl border-blue-900 my-2'  name="" id="" />
         
         <div className='justify-self-end'>
         <button className='p-2 w-[120px]  h-fit rounded-2xl bg-blue-900 text-white font-bold  cursor-pointer ' onClick={handleSubmit}> Submit</button>
        </div>

    </div>
  )
}

export default Certification