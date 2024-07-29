import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/signup");
    }
  }, [currentUser, navigate]);
  return (
    <>
      {currentUser ? (
        <div className="text-red-500">Home</div>
      ) : (
        <div>Redirecting...</div>
      )}
    </>
  );
}

export default Home;
