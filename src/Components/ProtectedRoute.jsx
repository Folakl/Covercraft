import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { FormContext } from "./FormContext";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { isloggedin } = useContext(FormContext);
  const handleSignup=()=>{
        navigate("/signup")
  }

  if (!isloggedin) {
    return (
      <div className="flex justify-center items-center" >
       <div className="text-center lg:pt-[150px] md:pt-[120px] pt-20 ">
         <h3 className=" font-bold text-[30px] text-blue-950  ">Sign up and Log in to view pages</h3>
          <button  onClick={handleSignup} className="w-[220px] rounded-2xl text-white bg-blue-950 py-5 font-bold cursor-pointer mt-10 mx-[120px]">Sign Up here</button>
       </div>
      </div>
    )
  }

  return <Outlet />; // 👈 renders all nested routes if logged in
};

export default ProtectedRoute;