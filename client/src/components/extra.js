import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { Link, NavLink, useNavigate } from "react-router-dom";
import bg from "../assets/Rectangle 179.png";
import logo from "../assets/sicu-aura_logo-removebg 3.png";
import writing from "../assets/sicu-aura_logo-removebg 2.png";
import nextLogo from "../assets/image 12.png";
import photoImage from "../assets/Vector.png";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { capturedPhoto } from "../Redux/Hospital/userSlice";

const Face = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCaptureadImage] = useState(null);
  const [isPhotoIconClicked, setIsPhotoIconClicked] = useState(false);
  const navigate = useNavigate();
  const [imageProgress, setImageProgress] = useState(0);
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();
  const [imageFileUrl, setImageFileURL] = useState("");

  const capturePhoto = () => {
    if (webcamRef.current) {
      const imgSrc = webcamRef.current.getScreenshot();
      setCaptureadImage(imgSrc);
    } else {
      console.error("webcamRef is null");
    }
  };

  const retakePhoto = () => {
    setCaptureadImage(null);
  };

  const handleFileUpload = async (imageDataUrl) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + ".jpeg";
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(
      storageRef,
      await (await fetch(imageDataUrl)).blob()
    );

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageProgress(Math.floor(progress));
      },
      (error) => {
        setImageError(true);
        console.error("Upload failed", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileURL(downloadURL);
          console.log("File available at", downloadURL);
          navigate("/getdata", { state: { loginImage: downloadURL } });
        });
      }
    );
  };

  useEffect(() => {
    if (capturedImage) {
      handleFileUpload(capturedImage);
    }
  }, [capturedImage]);

  return (
    <div className="flex">
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

      <div className="w-[70%] h-screen ">
        <div className="flex  gap-44 mt-4 items-center ">
          <img src={nextLogo} alt="" className="w-[98px] h-[98px] ml-20" />
          <div className="w-[230px] h-[45px] flex gap-2">
            <Link to="/signup">
              <span className="text-[#CDCDCD] text-3xl font-semibold">
                Sign Up /
              </span>
            </Link>
            <Link to="/login">
              <span className=" text-[#261E3B] text-3xl font-semibold">
                Login
              </span>
            </Link>
          </div>
        </div>
        <div className="flex justify-center flex-col items-center mt-10">
          <div className="mb-5 font-bold">
            <p className="text-[#505050]">
              Please Capture Our face to continue
            </p>
          </div>
          {!isPhotoIconClicked ? (
            <div className="w-[514px] h-[450px] rounded-lg bg-[#C0C0C0] flex justify-center items-center">
              <div className="">
                <img
                  src={photoImage}
                  alt=""
                  onClick={() => setIsPhotoIconClicked(true)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          ) : (
            <>
              {isPhotoIconClicked && capturedImage ? (
                <>
                  <img src={capturedImage} alt="Captured" />
                  <div className="flex gap-6">
                    <button
                      type="submit"
                      onClick={retakePhoto}
                      className=" bg-[#A0A0A0] text-[#261E3B]  p-2 font-bold text-sm mt-10 rounded-lg px-6"
                    >
                      Re-take
                    </button>
                    <NavLink className=" text-white bg-[#261E3B] p-2 font-semibold text-sm mt-10 rounded-lg px-6">
                      Continue
                    </NavLink>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex">
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      width={500}
                      className="rounded-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    onClick={capturePhoto}
                    className="bg-deepPurple text-white bg-[#261E3B] p-2 font-semibold text-sm mt-10 rounded-lg px-6"
                  >
                    Capture
                  </button>
                </>
              )}
              <p className="text-sm self-center font-bold">
                {imageProgress > 0 && imageProgress < 100 ? (
                  <span className="text-slate-700">{`Uploading ${imageProgress} %`}</span>
                ) : imageProgress === 100 ? (
                  <span className="text-green-700">
                    file upload Successfully
                  </span>
                ) : (
                  ""
                )}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Face;
