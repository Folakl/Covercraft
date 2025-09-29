import React, { useState, useContext } from 'react'
import { FormContext } from '../Components/FormContext'
import Personalinfo from '../Components/Personalinfo'
import Certification from '../Components/Certification'
import Education from '../Components/Education'
import Skills from '../Components/Skills'
import WorkExperience from '../Components/WorkExperience'
import { supabase } from '../SupabaseClient'    
import { useNavigate } from 'react-router-dom'

const Resume = () => {
  const navigate =useNavigate();
  const [showOverlay,setShowoverlay] = useState(false)
  const [professionalshowOverlay,setProfessionalshowOverlay] = useState(false)
  const [workExperienceoverlay,setWorkExperienceoverlay] = useState(false)
  const [educationOverlay,setEducationOverlay] = useState(false)
  const [skillsOverlay,setSkillsOverlay] = useState(false)
  const [certificateoverlay,setCertificateoverlay] = useState(false)
  const {formData, isloggedin}=  useContext(FormContext);
  const [loading, setLoading] = useState(false);

  // Close all
  const handleClose = () => {
    setShowoverlay(false)
    setCertificateoverlay(false)
    setProfessionalshowOverlay(false)
    setEducationOverlay(false)
    setSkillsOverlay(false)
    setWorkExperienceoverlay(false)
  }
    const handleInsideClick = (e) => {
    e.stopPropagation();
  }





const handleSubmitResume = async () => {
  setLoading(true);
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.error("No logged-in user found");
      setLoading(false);
      return;
    }

    // Check if profile exists
    const { data: profileData, error: profileError } = await supabase
      .from("profile")
      .select("id")
      .eq("id", user.id)
      .single();

    if (profileError && profileError.code !== "PGRST116") { // ignore 'no rows' error
      console.error("Error fetching profile:", profileError.message);
      setLoading(false);
      return;
    }

    // If profile doesn't exist, create it
    if (!profileData) {
      const { error: insertProfileError } = await supabase.from("profile").insert({
        id: user.id,
        name: formData.personal.name || "Unnamed User",
        email: formData.personal.email || user.email
      });

      if (insertProfileError) {
        console.error("Error creating profile:", insertProfileError.message);
        setLoading(false);
        return;
      }
    }

    // Prepare resume object
    const resume = {
      profile_id: user.id, // now guaranteed to exist
      title: formData.personal.title || "Untitled Resume",
      resume_data: {
        personal: formData.personal,
        workexperience: formData.workexperience,
        skill: formData.skill,
        certification: formData.certification,
        education: formData.education,
      },
    };

    // Insert resume
    const { data, error } = await supabase.from("resumes").insert([resume]).select();

    if (error) console.error("Insert Error:", error.message);
    else {
      console.log("Resume saved:", data[0]);
      navigate("/ai"); // redirect to AI page
    }
  } catch (err) {
    console.error("Unexpected Error:", err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      {isloggedin &&  (
      <div className='relative'>
      <div className="">
        <h1 className="pt-20 text-center text-3xl font-bold">Let's Create Your Resume</h1>
        <h3 className="px-5">Answer a few questions, and we'll generate a polished, job ready resume for you</h3>
      </div>

      <div className='grid lg:flex md:flex lg:justify-between md:justify-between grid-cols-1 gap-2 lg:m-5 md:m-5 m-1 '>
        <div className='lg:w-1/2 md:w-1/2 w-fi tmx-5   border-2 border-[navy] rounded-2xl p-5 '>
          <div className='flex justify-between font-bold my-2'>
            <h3>Personal Information</h3>
            <button className="bg-[navy] text-white font-bold px-10 py-2 rounded-md cursor-pointer "
              onClick={() => setShowoverlay(true)}> Edit</button>
          </div>
          <div className='flex justify-between font-bold my-2'>
            <h3>Education Background</h3>
            <button className="bg-[navy] text-white font-bold px-10 py-2 rounded-md cursor-pointer"
              onClick={() => setEducationOverlay(true)}> Edit</button>
          </div>
           <div className='flex justify-between font-bold my-2'>
            <h3>Professional Skills</h3>
            <button className="bg-[navy] text-white font-bold px-10 py-2 rounded-md cursor-pointer"
              onClick={() => setSkillsOverlay(true)}> Edit</button>
          </div>
           <div className='flex justify-between font-bold my-2'>
            <h3>Certification</h3>
            <button className="bg-[navy] text-white font-bold px-10 py-2 rounded-md cursor-pointer"
              onClick={() => setCertificateoverlay(true)}> Edit</button>
          </div>  
          <div className='flex justify-between font-bold my-2'>
            <h3>Professional Summary</h3>
            <button className="bg-[navy] text-white font-bold px-10 py-2 rounded-md cursor-pointer"
              onClick={() => setProfessionalshowOverlay(true)}> Edit</button>
          </div>
          <div className='flex justify-between font-bold my-2'>
            <h3>Work Experience</h3>
            <button className="bg-[navy] text-white font-bold px-10 py-2 rounded-md cursor-pointer"
              onClick={() => setWorkExperienceoverlay(true)}> Edit</button>
          </div>
          
         
         
        </div>
        <div className='lg:w-1/2 md:w-1/2 w-fit rounded-2xl border-2 border-blue-950 p-3 mx-5   '>
          <h3 className='text-center font-extrabold text-[25px] text-blue-950 mb-4'>Live Preview</h3>
          
           
               <div className='grid-cols-2 w-fit grid gap-5'>
             <div>
            <h1 className='font-bold underline '>Personal Info</h1>
            <h3>Name: {formData.personal.name}</h3>
            <h3>Phone Number: {formData.personal.phoneNumber}</h3>
            <h3>Email Address: {formData.personal.email}</h3>
            <h3>Location: {formData.personal.location}</h3>
            <h3>Job Title: {formData.personal.title}</h3>
            <h3>Social Platform: {formData.personal.social}</h3>
           </div>
               <div>
              <h1 className='font-bold underline'>Education Background</h1>
               <h3>Degree: {formData.education.degree}</h3>
               <h3>Institution: {formData.education.institutionName}</h3>
               <h3>Location: {formData.education.Location}</h3>
               <h3>Start Date: {formData.education.startDate}</h3>
               <h3>End Date: {formData.education.endDate}</h3>
            </div>
              <div>
              <h1 className='font-bold underline'>Work Experience</h1>
              <h3>Job Title: {formData.workexperience.jobtitle}</h3>
              <h3> Company Name: {formData.workexperience.companyName}</h3>
              <h3> Location: {formData.workexperience.Location}</h3>
              <h3> Start Date: {formData.workexperience.yearsofexperience}</h3>
              <h3>Description: {formData.workexperience.description}</h3>
            </div>
              <div>
              <h1 className='font-bold underline'>Certification</h1>
              <h3>Certification: {formData.certification.name}</h3>
              <h3>Organization: {formData.certification.organization}</h3>
              <h3>Date: {formData.certification.dateissued}</h3>
              <h3>Description: {formData.certification.description}</h3>
            </div>
            <div>
              <h1 className='font-bold underline'>Skill</h1>
              <h3>Technical Skill: {formData.skill.technicalSkill}</h3>
              <h3>Soft Skill: {formData.skill.softSkill}</h3>
              <h3>Skill Level: {formData.skill.Level}</h3>
            </div>
           
          
        </div>
          
        </div>
        
      </div>

      {/* Overlays */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleClose}>
          <div className="bg-white p-6 rounded-lg" onClick={handleInsideClick}>
            <Personalinfo handleClose={handleClose} />
          </div>
        </div>
      )}

      {professionalshowOverlay && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleClose}>
          <div className="bg-white p-6 rounded-lg " onClick={handleInsideClick}>
            <Professionalsummary handleClose={handleClose}  />
          </div>
        </div>
      )}

      {workExperienceoverlay && (
        <div className="fixed inset-0 overflow-y-scroll  bg-black/50 flex items-center justify-center z-50" onClick={handleClose}>
          <div className="bg-white p-6 rounded-lg" onClick={handleInsideClick}>
            <WorkExperience handleClose={handleClose} />
          </div>
        </div>
      )}

      {educationOverlay && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleClose}>
          <div className="bg-white p-6 rounded-lg" onClick={handleInsideClick}>
            <Education handleClose={handleClose} />
            
          </div>
        </div>
      )}

      {skillsOverlay && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleClose}>
          <div className="bg-white p-6 rounded-lg" onClick={handleInsideClick}>
            <Skills handleClose={handleClose}/>
          </div>
        </div>
      )}

      {certificateoverlay && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleClose}>
          <div className="bg-white p-6 rounded-lg" onClick={handleInsideClick}>
            <Certification handleClose={handleClose}/>
          </div>
        </div>
      )}

      <div className='flex justify-end'>
        {
          loading? (<button className='cursor-pointer w-fit px-10 py-2 bg-blue-900 rounded-2xl text-white font-bold' onClick={handleSubmitResume}>Submiting to Ai</button>):
          <button className='cursor-pointer w-fit px-10 py-2 bg-blue-950 rounded-2xl text-white font-bold' onClick={handleSubmitResume}>Submit to Ai</button>
        }

      </div>
    </div>
    )}
    </div>
  )
}

export default Resume
