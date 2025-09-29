import React, { useContext } from "react";
import { FormContext } from "./FormContext";

const Profilepic = () => {
  const { setProfilepic } = useContext(FormContext);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // create a temporary URL for preview
      const imageUrl = URL.createObjectURL(file);
      setProfilepic(imageUrl);
    }
  };

  return (
    <div className="flex justify-center items-center bg-white p-5">
      <div className="border-2 border-blue-950 p-4 rounded-lg">
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="w-[300px] h-fit p-2 boder-2 "
        />
      </div>
    </div>
  );
};

export default Profilepic;
