import { createContext, useState } from "react";
import React from "react";
import profilecard from '../assets/lander.jpg';

export const FormContext = createContext(); 

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    personal: {},
    education: {},
    skill: {},
    certification: {},
    workexperience: {},
    // Summary: {}
  });
    
  const [isloggedin, setIsloggedin] = useState(false);

  // Default profile pic
  const [profilepic, setProfilepic] = useState(profilecard);

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        isloggedin,
        setIsloggedin,
        profilepic,
        setProfilepic,
      
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
