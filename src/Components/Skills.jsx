import React, { useState } from 'react'
import { useContext } from 'react';
import { FormContext } from './FormContext';
const Skills = ({handleClose}) => {
  const {setFormData} = useContext(FormContext)
  const [technicalSkill,setTechnicalSkill] = useState('');
  const [softSkill,setSoftSkill] = useState("");
  const [Level,setLevel] = useState("");

  const handleSubmit =()=>{
    if(!technicalSkill && !softSkill && !Level){
      alert("fill out all input spaces")
    }else if(!technicalSkill){
      alert("enter Technical skill input")
    }else if(!softSkill){
      alert("Enter Soft Skill input")
    }else if(!Level){
      alert('select your skill level')
    }else{
        const newSkillinfo = {
      technicalSkill,
      softSkill,
      Level
    }
    setFormData((prev) => ({
    ...prev,
    skill: newSkillinfo,  // store directly
     }));
     setTechnicalSkill("");
     setSoftSkill("");
     setLevel("");
     handleClose();
    }
  }
  return (
   <div className='bg-transparent w-fit p-5 border-5 justify-self-center rounded-2xl mt-5 border-blue-900'>
           <h1 className='font-bold text-[25px] '>Skills</h1>
        <h3 className='text-[20px] '>Technical Skills <span className='text-[red]'>*</span></h3>
       <textarea name="" value={technicalSkill}
         onChange={(e)=>{setTechnicalSkill(e.target.value)}} className='p-2 text-black border-2 w-[400px] rounded-2xl border-blue-900 my-2'  id="">React..</textarea>

        <h3 className='text-[20px] '>Soft Skills <span className='text-[red]'>*</span></h3>
       <textarea name="" value={softSkill}
           onChange={(e)=>{setSoftSkill(e.target.value)}}
           className='p-2 text-black border-2 w-[400px] rounded-2xl border-blue-900 my-2'  id="">Communication..</textarea>

        <h3 className='text-[20px] '> Skill Level <span className='text-[red]'>*</span></h3>
         <div className='flex gap-2'>
        <input type="checkbox" name="" id="" value="Beginner" 
         checked={Level === "Beginner"}
          onChange={(e)=>{setLevel(e.target.value)}}
             />
         <h3>Beginner</h3>
         </div>

         <div className='flex gap-2'>
        <input type="checkbox" name="" id=""  value="Intermediate"
         checked={Level === "Intermediate"}
          onChange={(e)=>{setLevel(e.target.value)}}
        />
         <h3>Intermediate</h3>
         </div>

         <div className='flex gap-2'>
        <input type="checkbox" name="" id="" value="Expert"
        checked={Level === "Expert"}
          onChange={(e)=>{setLevel(e.target.value)}}/>
         <h3>Expert</h3>
         </div>
       
        
         <div className='justify-self-end'>
         <button className='p-2 w-[120px]  h-fit rounded-2xl bg-blue-900 text-white font-bold cursor-pointer' onClick={handleSubmit}>Submit</button>
        </div>

    </div>
  )
}

export default Skills