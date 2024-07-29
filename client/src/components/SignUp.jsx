import React, { useEffect, useState } from "react";
import bg from "../assets/Rectangle 179.png";
import logo from "../assets/sicu-aura_logo-removebg 3.png";
import writing from "../assets/sicu-aura_logo-removebg 2.png";
import nextLogo from "../assets/image 12.png";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../Redux/Hospital/userSlice";
import { app } from "../firebase";
import { toast } from "react-toastify";
import { Modal, FloatingLabel } from "flowbite-react";
import checkMark from "../assets/Checkmark.png";

const SignUp = () => {
  const [formData, setFormData] = useState({
    hospitalName: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    registrationDate: "",
    ambulanceAvailable: "",
    registrationCertificateUpload: "",
    email: "",
    phoneNumber: "",
    hospitalRegisterNumber: "",
    wardNumber: "",
    password: "",
    conformPassoword: "",
  });
  // console.log(formData);
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [imageProgress, setImageProgress] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // console.log(file);

  const handleFileUpload = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageProgress(Math.floor(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({
            ...formData,
            registrationCertificateUpload: downloadURL,
          });
        });
      }
    );
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      if (formData.password !== formData.conformPassoword) {
        toast("password do not match");
        return;
      }
      const res = await fetch("/api/hospital/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data));
        setShowModal(true);
      } else {
        dispatch(signInFailure(data.message));
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  useEffect(() => {
    let timer;
    if (showModal) {
      timer = setTimeout(() => {
        setShowModal(false);
        navigate("/login");
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [showModal]);

  return (
    <div className="max-h-screen flex w-[100%]">
      {/* Left Part */}
      <div
        className=" w-[30%] min-h-screen  p-8 flex flex-col gap-4 items-center"
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
      <div className="w-[70%] max-h-screen ">
        <div className="flex  gap-44  items-center  m-4 ">
          <img src={nextLogo} alt="" className="w-[98px] h-[98px] ml-20" />
          <div className="w-[230px] h-[45px] flex gap-2">
            <span className="text-[#261E3B] text-3xl font-semibold">
              Sign Up
            </span>
            <Link to="/login">
              <span className="text-[#CDCDCD] text-3xl font-semibold">
                / Login
              </span>
            </Link>
          </div>
        </div>

        {/* Input Section */}
        <form
          onSubmit={handleSubmit}
          className="space-y-0 mx-10 px-10 max-h-screen"
        >
          <div className="grid grid-cols-2 gap-x-24 gap-4  max-h-screen">
            <FloatingLabel
              variant="standard"
              label="hospitalName"
              id="hospitalName"
              onChange={handleInput}
              className="focus:border-black focus:text-black  "
            />

            <FloatingLabel
              variant="standard"
              label="Email ID"
              type="email"
              id="email"
              onChange={handleInput}
              className="focus:border-black focus:text-black  "
            />

            <FloatingLabel
              variant="standard"
              label="Address"
              id="address"
              onChange={handleInput}
              className="focus:border-black focus:text-black  "
            />

            <FloatingLabel
              variant="standard"
              label="Phone Number"
              type="Number"
              id="phoneNumber"
              onChange={handleInput}
              className="focus:border-black focus:text-black  "
            />

            <FloatingLabel
              variant="standard"
              label="City"
              id="city"
              onChange={handleInput}
              className="focus:border-black focus:text-black  "
            />

            <FloatingLabel
              variant="standard"
              label="Hospital Registration Number"
              type="Number"
              id="hospitalRegisterNumber"
              onChange={handleInput}
              className="focus:border-black focus:text-black  "
            />

            <FloatingLabel
              variant="standard"
              label="State"
              id="state"
              onChange={handleInput}
              className="focus:border-black focus:text-black  "
            />

            <FloatingLabel
              variant="standard"
              label="Emergency-Ward Number"
              type="Number"
              id="wardNumber"
              onChange={handleInput}
              className="focus:border-black focus:text-black  "
            />

            <FloatingLabel
              variant="standard"
              type="Number"
              label="Pincode"
              id="pinCode"
              onChange={handleInput}
              className="focus:border-black focus:text-black  "
            />

            <div className="flex flex-col justify-start items-start gap-4 ">
              <label className="mr-2 text-[#BCBCBC] text-lg border-b-2 border-gray-300 w-full p-2 ">
                Registration certificate Upload:
              </label>
              <input
                type="file"
                ref={fileRef}
                id="registrationCertificateUpload"
                hidden
                accept="file/*"
                className="w-full p-2 border-b-2 border-gray-300 "
                onChange={(e) => setFile(e.target.files[0])}
              />
              <p className="text-sm self-center font-bold">
                {imageError ? (
                  <span className="text-red-600">
                    Error uploading File (file size must be less than 2 MB)
                  </span>
                ) : imageProgress > 0 && imageProgress < 100 ? (
                  <span className="text-slate-700">{`Uploading ${imageProgress} %`}</span>
                ) : imageProgress === 100 ? (
                  <span className="text-green-700">
                    file upload Successfully
                  </span>
                ) : (
                  ""
                )}
              </p>
              <button
                type="button"
                onClick={() => fileRef.current.click()}
                className="bg-[#261E3B]  text-xl h-[40px] text-white   rounded-lg w-[100px]  text-center opacity-70"
              >
                Choose
              </button>
            </div>

            <FloatingLabel
              variant="standard"
              label="Hospital Registration Date:(mm-dd-yyyy)"
              id="registrationDate"
              onChange={handleInput}
              className="focus:border-black focus:text-black  "
            />

            <FloatingLabel
              variant="standard"
              label="Number Of Ambulance available"
              type="Number"
              id="ambulanceAvailable"
              onChange={handleInput}
              className="focus:border-black focus:text-black  "
            />
            <FloatingLabel
              variant="standard"
              type="password"
              label="Create Password"
              id="password"
              onChange={handleInput}
              className="focus:border-black focus:text-black  "
            />

            <FloatingLabel
              variant="standard"
              type="password"
              label="Conform Password"
              id="conformPassoword"
              onChange={handleInput}
              className="focus:border-black focus:text-black  "
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-1 ">
            <div className="flex justify-center mt-2">
              <button
                type="submit"
                className="w-[120px] h-[50px] bg-[#261E3B] text-center text-xl text-white  rounded-lg hover:opacity-45"
              >
                {loading ? (
                  <>
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>

            {/* {error && <div>{error}</div>} */}
            {/* {error && toast(error)} */}

            <div className="">
              <p className="text-[#BCBCBC] text-center  text-lg">
                • Terms and Condition privacy policy
              </p>
            </div>
          </div>
        </form>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="xl"
      >
        <div className="border-4 rounded-lg  shadow-custom-shadow  border-gray-300">
          <Modal.Body>
            <div className="text-center mt-5 ">
              <img
                src={checkMark}
                className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"
              />
              <h3 className="text-[#505050]  mb-5 text-2xl font-semibold">
                Your Registration has been Successful
              </h3>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
};

export default SignUp;
