import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import OnlyAdminPrivateRoute from "./components/OnlyAdminRoute";
import AllData from "./components/AllData";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/getdata" element={<AllData />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
