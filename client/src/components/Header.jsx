import React from "react";
import logo from "../assets/sicu-aura_logo-removebg 3.png";
import writing from "../assets/sicu-aura_logo-removebg 2.png";
import profile from "../assets/Ellipse 40.png";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../Redux/Hospital/userSlice";
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/hospital/signout");

      const data = await res.json();

      if (res.ok) {
        dispatch(signOutSuccess());
        navigate("/signup");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-[1540px]  h-[80px] text-white bg-[#201A31] flex items-center justify-around">
      {/* Left */}
      <div className=" flex items-center gap-0">
        <img src={logo} alt="" className="h-[62px] w-[60px]" />
        <img src={writing} alt="" className="h-[29px] w-[132px]" />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <img src={profile} alt="" />
        <p className="w-[96px] h-[17px] "> Alex robian</p>
        <button
          onClick={handleSubmit}
          className="bg-[#302A41] text-white p-2 px-6  rounded-xl h-[40px] w-[106px] flex items-center text-center"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default Header;
