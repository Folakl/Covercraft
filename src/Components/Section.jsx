import React from 'react'
import coverletter from '../assets/coverletter2.png';
import resume2 from '../assets/resumeicon2.png';
import { useNavigate } from 'react-router-dom';
const Section = () => {
    const navigate = useNavigate();
      const toggleButton = (id) => {
    if (id === 1) {
      navigate("/resume");
    } else if (id === 2) {
      navigate("/coverletter");
    }
  };
    const list = [
        {
            id:1,
            text:"create your job ready resume",
            img: resume2,

        },
        {
            id:2,
            text:"create your job ready cover letter",
            img: coverletter,
        }
        // },
        // {
        //     id:3,
        //     text:"Choose tempates for your resume and cover letter generated",
        //     img: coverletter,

        // }
    ]
  return (

        <div className='flex  gap-5 flex-wrap  mt-5 justify-center mx-10 '>
 {
    list.map((cover)=>(
        <div key={cover.id } className='flex px-5 py-5 rounded-3xl bg-blue-950 text-white cursor-pointer' onClick={() => toggleButton(cover.id)}>
            <img src={cover.img} className='w-[100px] h-[100px] rounded-full px-2 py-2' alt="" />
            <div className='flex mt-5 ml-5  rounded-2xl px-3 py-2 h-fit gap-5 bg-white text-blue-950  shadow-md'> 
                <h3 className='text-l font-bold '>{cover.text}</h3>
                <h3 className=' text-[20px] cursor-pointer' ><ion-icon name="chevron-forward-outline"></ion-icon></h3>
            </div>
         </div>
    
    ))
 }

    </div>
    

  )
}

export default Section