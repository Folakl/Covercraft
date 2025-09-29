import React from 'react'
import resumeicon from '../assets/resume icon.png'
import coverlettericon from '../assets/coverletter icon.png'
import projecticon from '../assets/project icon.png'
import templatesicon from '../assets/templates.png'


const Features = () => {
   const feature = [
      {
         id: 1,
         name: "Resume Generation",
         use:"Covercraft helps you to create a resume with varieties of templates to choose from ,projects section for allowed acessibility to previous work.it implements and uses Ai to  provide perfect resume  for your next job applications.",
         img: resumeicon
      },
      {
         id: 2,
         name: "Cover letter Generation",
         use:"Covercraft helps you to create a cover letter with varieties of templates to choose from ,projects section for allowed acessibility to previouse work. it implements and uses Ai to  provide perfect cover letter for your next job applications.",
         img: coverlettericon
      },
      {
         id: 3,
         name: "Project",
         use:"Project section to view list of previous projects",
         img:projecticon
      },
      {
         id: 4,
         name: "Templates",
         use:"varieties od templates to choose from,for your resume and cover letter",
         img: templatesicon
      }
   ]
  return (
    <div className='grid grid-cols-1  mx-5 lg:flex-wrap lg:flex md:grid md:grid-cols-2     gap-10 '>
      
    {feature.map((item) => (
        <div key={item.id} className="max-w-sm p-4 flex gap-2 h-fit   rounded-lg shadow-md">
          <img
            src={item.img}
            alt={item.name}
            className="w-15 h-15 mt-2 rounded-full border-2 border-black"
          />
          <div>
            <h3 className="font-bold text-2xl mt-2">{item.name}</h3>
            <p className="pl-2">{item.use}</p>
          </div>
        </div>
      ))}
     
        

    </div>
  )
}

export default Features