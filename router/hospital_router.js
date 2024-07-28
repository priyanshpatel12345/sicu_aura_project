import express from "express";
import {
  getAllUserData,
  getHospital,
  login,
  register,
  signout,
} from "../controllers/hospital_controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.get("/get/allData", getAllUserData);
router.get("/getdata/:id", getHospital);
router.get("/signout", verifyToken, signout);

export default router;
