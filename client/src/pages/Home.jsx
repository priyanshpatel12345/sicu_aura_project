import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      {!currentUser ? navigate("signup") : <div className="text-2xl">Home</div>}
    </>
  );
}

export default Home;
