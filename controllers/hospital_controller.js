import Hospital from "../models/hospital_model.js";
import { errorHandler } from "../utils/err.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// *******************************************
//    register logic
// ********************************************

export const register = async (req, res, next) => {
  const {
    hospitalName,
    address,
    city,
    state,
    pinCode,
    registrationDate,
    ambulanceAvailable,
    registrationCertificateUpload,
    email,
    phoneNumber,
    hospitalRegisterNumber,
    wardNumber,
    password,
  } = req.body;

  if (
    !hospitalName,
    !address,
    !city,
    !state,
    !pinCode,
    !registrationDate,
    !ambulanceAvailable,
    !email,
    !phoneNumber,
    !hospitalRegisterNumber,
    !registrationCertificateUpload,
    !password,
    !wardNumber)
   {
    next(errorHandler(400, "All fields are required"));
  }

  if (password.length <= 6 && !password.includes("@")) {
    return;
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newHospital = new Hospital({
    hospitalName,
    address,
    city,
    state,
    pinCode,
    registrationDate,
    registrationCertificateUpload,
    ambulanceAvailable,
    email,
    phoneNumber,
    hospitalRegisterNumber,
    wardNumber,
    password: hashedPassword,
  });

  try {
    await newHospital.save();
    res.status(200).json({ message: "signup Successfully!!", newHospital });
  } catch (error) {
    next(error);
  }
};

// *******************************************
//    login Logic
// ********************************************

export const login = async (req, res, next) => {
  const { hospitalName, email, password, specialAccessCode } = req.body;

  if ((!hospitalName, !email, !password, !specialAccessCode)) {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validHospital = await Hospital.findOne({
      email,
    });

    if (!validHospital) {
      return next(errorHandler(404, "Hospital Not Found"));
    }

    const validPassword = bcryptjs.compareSync(
      password,
      validHospital.password
    );
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Credential"));
    }

    const token = jwt.sign(
      { email: validHospital.email },
      process.env.JWT_TOKEN,
      {
        expiresIn: "30d",
      }
    );

    // const { password: pass, ...rest } = validHospital._doc;

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json({ specialAccessCode, validHospital });
  } catch (error) {
    next(error);
  }
};

// *******************************************
//    signout Logic
// ********************************************

export const signout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out");
  } catch (error) {
    next(error);
  }
};

// *******************************************
//    get All Hospital data Logic
// ********************************************

export const getAllUserData = async (req, res, next) => {
  try {
    const hospitals = await Hospital.find();
    return res.status(200).json(hospitals);
  } catch (error) {
    next(error);
  }
};

// *******************************************
//    get Single Hospital data Logic
// ********************************************

export const getHospital = async (req, res, next) => {
  try {
    const getHospitalData = await Hospital.findById(req.params.id);
    res.status(200).json(getHospitalData);
  } catch (error) {
    next(error);
  }
};
