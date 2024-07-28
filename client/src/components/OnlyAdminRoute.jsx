import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function OnlyAdminPrivateRoute() {
  const { code } = useSelector((state) => state.user);
  return code === "sicu_aura" ? <Outlet /> : <Navigate to="/login" />;
}

export default OnlyAdminPrivateRoute;
