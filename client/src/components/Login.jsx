import React, { useState, useEffect } from "react";
import bg from "../assets/Rectangle 179.png";
import logo from "../assets/sicu-aura_logo-removebg 3.png";
import writing from "../assets/sicu-aura_logo-removebg 2.png";
import nextLogo from "../assets/image 12.png";
import { Link, useNavigate } from "react-router-dom";
import Face from "./Face";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
  specialAccessCode,
} from "../Redux/Hospital/userSlice";

function Login() {
  const [formData, setFormData] = useState("");
  const [isLoginCompleted, setIsLoginCompleted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/hospital/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setIsLoginCompleted(true);
        dispatch(signInSuccess(data.validHospital));
        dispatch(specialAccessCode(data.specialAccessCode));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <>
      {isLoginCompleted ? (
        <Face />
      ) : (
        <div className="h-screen flex w-[100%]">
          {/* Left Part */}
          <div
            className="h-screen w-[30%] bg-red-600  flex flex-col gap-4 items-center"
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="text-center mt-[75px] flex flex-col gap-8">
              <div className="flex flex-col">
                <img src={logo} alt="" className="w-[250px] h-[300px] " />
                <img src={writing} alt="" className="w-[270px] h-[63px]" />
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex gap-3 mx-auto text-cente ml-3">
                  <p className="text-3xl font-bold  text-white">Feel</p>
                  <p className="text-3xl font-bold  text-green-500">Safe</p>
                  <p className="text-3xl font-bold  text-white">Everywhere</p>
                </div>
                <div className="flex mx-auto text-center ">
                  <p className="text-xl font-semibold  text-white">#Safe-</p>
                  <p className="text-xl font-semibold  text-green-500">T</p>
                  <p className="text-xl font-semibold  text-white">-Fast</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-[70%] h-screen ">
            <div className="flex  gap-44 mt-4 items-center ">
              <img src={nextLogo} alt="" className="w-[98px] h-[98px] ml-20" />
              <div className="w-[230px] h-[45px] flex gap-2">
                <Link to="/signup">
                  <span className="text-[#CDCDCD] text-3xl font-semibold">
                    Sign Up /
                  </span>
                </Link>
                <span className=" text-[#261E3B] text-3xl font-semibold">
                  Login
                </span>
              </div>
            </div>
            {/* Input Section */}
            <div className="space-y-1 px-10 w-[514px] h-[480px] mx-auto p-6 border-4 rounded-[30px]  shadow-custom-shadow   border-gray-300 flex flex-col items-center justify-center">
              <div className="flex flex-col gap-3">
                <p className="text-[#261E3B] text-2xl font-semibold text-center">
                  Welcome to sicu-aura
                </p>
                <p className="text-[#BCBCBC]">
                  Your one stop safety solutions using innovative technology
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-1  w-[350px] h-[540px] mx-auto"
              >
                <div className="grid gap-x-24 gap-8 mt-10">
                  <input
                    type="text"
                    id="hospitalName"
                    placeholder="Hospital Name"
                    className="w-full p-2 border-b-2 border-gray-300 rounded"
                    onChange={handleInput}
                  />
                  <input
                    id="email"
                    type="email"
                    placeholder="Email ID"
                    className="w-full p-2 border-b-2 border-gray-300 rounded"
                    onChange={handleInput}
                  />
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border-b-2 border-gray-300 rounded"
                    onChange={handleInput}
                  />
                  <input
                    id="specialAccessCode"
                    type="type"
                    placeholder="Special Access Code"
                    className="w-full p-2 border-b-2 border-gray-300 rounded"
                    onChange={handleInput}
                  />
                </div>
              </form>
            </div>
            <div className="flex flex-col items-center gap-6 mt-6">
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-[150px] h-[50px] bg-[#261E3B] text-center text-xl text-white  rounded-[15px] hover:opacity-45"
              >
                Login
              </button>

              <p className="text-[#BCBCBC] text-center  text-lg">
                • Terms and Condition privacy policy
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
