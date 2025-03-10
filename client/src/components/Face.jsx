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
import { useSelector, useDispatch } from "react-redux";
import { setImageFileUrl } from "../Redux/Hospital/userSlice";
import { Modal } from "flowbite-react";
import team from "../assets/medical-team.png";

const Face = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCaptureadImage] = useState(null);
  const [isPhotoIconClicked, setIsPhotoIconClicked] = useState(false);
  const navigate = useNavigate();
  const [imageProgress, setImageProgress] = useState(0);
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();
  const [imageFileUrl, setImageFileURL] = useState();
  const [showModal, setShowModal] = useState(false);

  const capturePhoto = () => {
    if (webcamRef.current) {
      const imgSrc = webcamRef.current.getScreenshot();
      setCaptureadImage(imgSrc);
      dispatch(setImageFileUrl(capturedImage));
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
          dispatch(setImageFileUrl(downloadURL));
          console.log(imageFileUrl);
        });
      }
    );
  };

  useEffect(() => {
    if (capturedImage) {
      handleFileUpload(capturedImage);
    }
  }, [capturedImage]);

  useEffect(() => {
    let timer;
    if (showModal) {
      timer = setTimeout(() => {
        setShowModal(false);
        navigate("/getdata");
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [showModal, navigate]);

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
                    <button
                      onClick={() => setShowModal(true)}
                      className=" text-white bg-[#261E3B] p-2 font-semibold text-sm mt-10 rounded-lg px-6"
                    >
                      Continue
                    </button>
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
                src={team}
                className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"
              />
              <h3 className="text-[#505050]  mb-5 text-2xl font-semibold">
                Thank you for choosing our hospital.
              </h3>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
};

export default Face;
