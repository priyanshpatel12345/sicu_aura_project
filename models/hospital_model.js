import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    hospitalName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    registrationDate: {
      type: Date,
      required: true,
    },
    ambulanceAvailable: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    hospitalRegisterNumber: {
      type: Number,
      required: true,
    },
    registrationCertificateUpload: {
      type: String,
      required: true,
    },
    wardNumber: {
      type: Number,
      required: true,
    },
    specialAccessCode: {
      type: Number,
    },
    loginImage: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Inactive",
    },
  },
  { timestamps: true }
);

const Hospital = new mongoose.model("Hospital", hospitalSchema);

export default Hospital;
