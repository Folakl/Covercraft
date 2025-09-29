import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Resume from './Pages/Resume'
import Projects from './Pages/Projects'
import Coverletter from './Pages/Coverletter'
import Templates from './Pages/Templates'
import Personalinfo from './Components/Personalinfo'
import WorkExperience from './Components/WorkExperience'
import './App.css'
import Education from './Components/Education'
import Skills from './Components/Skills'
import Certification from './Components/Certification'
import Signup from './Pages/Signup'
import ProtectedRoute from './Components/ProtectedRoute'
import Profilepic from './Components/Profilepic'
// import { FormContext } from './Components/FormContext'
import Navbar from './Components/Navbar'
import Resetpassword from './Components/Resetpassword'
import SummarizeAi from './Components/SummarizeAi'
import ResumeGeneration from './Components/ResumeGeneration'

function App() {

  return (
    <div>
       <Navbar/>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path='/resetpassword' element={<Resetpassword/>}/>
      
         

        {/* Protected routes wrapper */}
        <Route element={<ProtectedRoute />}>
          
          <Route path="/projects" element={<Projects />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/coverletter" element={<Coverletter />} />
          <Route path="/cert" element={<Certification />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/education" element={<Education />} />
          <Route path="/personal" element={<Personalinfo />} />
          <Route path="/work" element={<WorkExperience />} />
          <Route path="/profilepic" element={<Profilepic/>} />
          <Route path='/ai' element={<SummarizeAi/>}/>
          <Route path='/resumegen' element= {<ResumeGeneration/>}/>
            <Route path="/resume" element={<Resume />} />
        
         
         
     
       
          
        
          
          
        </Route>
      </Routes>
      
    </div>
  )
}

export default App

