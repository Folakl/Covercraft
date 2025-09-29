import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
  <div className='bg-blue-950  text-white py-5'>
      <div className='w-full h-fit lg:px-[200px] md:px-10 px-5 py-5  flex lg:flex-wrap gap-5  justify-between'>
    <div>
    <Link to='/'>Home</Link> <br />
     <Link to=''>Template</Link> <br />
    <Link>Project</Link><br />
   <Link>Resume</Link> <br />
    <Link>Cover letter</Link>
    </div>
    <div>
    <Link to='/login'>login</Link> <br />
    <Link to ='/signup'>signup</Link><br />
   <Link>Project</Link><br />
   <Link>Resume</Link> <br />
    <Link>Cover letter</Link>
    </div>
    <div>
    <Link><h3>Home</h3></Link>
  <Link>Template</Link><br />
    <Link>Project</Link><br />
   <Link>Resume</Link> <br />
    <Link>Cover letter</Link>
    </div>
   
    </div>
    <div className='justify-end flex gap-5 mr-5'>
        <h3>You can reach us on </h3>
        <div className='flex text-white gap-2 '>
                <link rel="stylesheet" href="" ></link>
                <h3><ion-icon name="mail-outline"></ion-icon></h3>
                <h3><ion-icon name="logo-instagram"></ion-icon></h3>
                <h3><ion-icon name="logo-whatsapp"></ion-icon></h3>
                <h3><ion-icon name="logo-twitter"></ion-icon></h3>
        </div>
    </div>
  </div>
  )
}

export default Footer