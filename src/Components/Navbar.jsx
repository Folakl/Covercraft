import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FormContext } from "./FormContext";
import Profilepic from "./Profilepic";

const Navbar = () => {
  const navigate = useNavigate();
  const { profilepic, isloggedin } = useContext(FormContext);

  const [openOverlay, setOpenOverlay] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggleMenu = () => setToggleMenu(!toggleMenu);
  const handleProfile = () => setOpenOverlay(!openOverlay);
  const handleSignup = () => navigate("/signup");
  const handleCloseOverlay = () => setOpenOverlay(false);
  const handleInsideClick = (e) => e.stopPropagation();

  return (
    <div className="bg-blue-950 fixed z-50 text-white w-full p-3 flex justify-between items-center">
      {/* Brand */}
      <Link to="/" className="font-extrabold py-2 text-2xl">
        Cover<span className="text-blue-600">Craft</span>
      </Link>

   <div className="flex gap-2">
       {/* Desktop Nav */}
      <div className="flex gap-5 py-2 font-bold text-blue-600">
        <div className="lg:flex md:flex hidden gap-6">
          <NavLink to="/" className="cursor-pointer">Home</NavLink>
          <NavLink to="/resume" className="cursor-pointer">Resume</NavLink>
          <NavLink to="/coverletter" className="cursor-pointer">Cover letter</NavLink>
          <NavLink to="/projects" className="cursor-pointer">Projects</NavLink>
        </div>

        {isloggedin ? (
          <img
            src={profilepic}
            alt="profile"
            title="Set profile"
            onClick={handleProfile}
            className="rounded-full cursor-pointer h-10 w-10"
          />
        ) : (
          <button
            onClick={handleSignup}
            className="bg-white text-blue-950 rounded-2xl w-[120px] py-1 hover:bg-blue-600 hover:w-[125px] hover:text-white font-bold transition-all"
          >
            Sign Up
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div
        onClick={handleToggleMenu}
        className="text-white font-bold mt-2 text-[30px] lg:hidden md:hidden grid"
      >
        {toggleMenu ? (
          <ion-icon name="close-outline"></ion-icon>
        ) : (
          <ion-icon name="menu-outline"></ion-icon>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {toggleMenu && (
        <div className="absolute w-full  top-16 right-0 left-0 bg-blue-900 text-white rounded-lg shadow-lg flex flex-col gap-4 p-4 z-40">
          <NavLink to="/" onClick={handleToggleMenu}>Home</NavLink>
          <NavLink to="/resume" onClick={handleToggleMenu}>Resume</NavLink>
          <NavLink to="/resume" onClick={handleToggleMenu}>Cover letter</NavLink>
          <NavLink to="/projects" onClick={handleToggleMenu}>Projects</NavLink>
        </div>
      )}

      {/* Profile Overlay */}
      {openOverlay && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={handleCloseOverlay}
        >
          <div
            className="bg-white p-6 rounded-lg"
            onClick={handleInsideClick}
          >
            <Profilepic />
          </div>
        </div>
      )}
   </div>
    </div>
  );
};

export default Navbar;
