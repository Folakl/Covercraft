import React from 'react'
import Features from '../Components/Features'
import { useNavigate } from 'react-router-dom'
import Section from '../Components/Section'
import Footer from '../Components/Footer'
const Home = () => {
  const navigate = useNavigate();
  const  handleGetstarted = ()=>{
      navigate("/signup")
  }
  return (
   <div>
     <div className='bg-cover bg-center h-[550px]  px-10 ' style={{backgroundImage: "url('https://res.cloudinary.com/dxcnxksmq/image/upload/v1759137024/cv_wkhxrk.webp')"} }>
        
    
      <div className='text-[23px] font-serif pt-[120px] lg:ml-[250px] md:ml-[50px] ml-5'>
          {/* <h3>Covercraft helps you to create a resume,a cover letter with varieties of templates to choose from ,projects section for allowed acessibility to previouse work.
            it implements and uses Ai to  provide perfect resume and a cover letter for your next job applications. </h3> */}
            <h3 className='font-bold text-blue-950 text-[35px]'>Resumes Made Simple, <br />Career Made Strong</h3>
          <button className='w-[180px] py-2 h-fit mx-3 mt-5 text-white  font-bold rounded-2xl  bg-blue-950 cursor-pointer hover:w-[200px] hover:bg-blue-900' onClick={handleGetstarted} >Get Started</button>
          <button className='w-[180px] py-2 h-fit mx-3 mt-5   font-bold rounded-2xl  border-2 border-blue-950 text-blue-950 hover:text-white  cursor-pointer hover:w-[200px] hover:bg-blue-900' onClick={handleGetstarted} >Learn more</button>
    
   
     </div>

      

    </div>
    <hr className='border-2 mx-5 my-10 border-dotted' />
   <div >
     <Features/> 
   </div>
    <hr className='border-2 mt-10 mx-5 border-dotted' />
    <Section/>
    <div className='mt-10'>
       <Footer/>
    </div>
   </div>
  )
}

export default Home