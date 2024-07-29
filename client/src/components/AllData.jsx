import React, { useEffect, useState } from "react";
import Header from "./Header";
import image from "../assets/image 18.png";
import { IoSearch } from "react-icons/io5";
import { FaSort } from "react-icons/fa";
import { useSelector } from "react-redux";

function AllData() {
  const [hospitals, setHospitals] = useState([]);
  const [search, setSearch] = useState("");
  const [allHospitals, setAllHospitals] = useState([]);
  const [sortType, setSortType] = useState("alphabetical");

  const { currentUser } = useSelector((state) => state.user);

  const handleSearch = () => {
    const filteredHospitals = allHospitals.filter(
      (hospital) =>
        hospital.hospitalName &&
        hospital.hospitalName.toLowerCase().includes(search.toLowerCase())
    );
    setHospitals(filteredHospitals);
  };

  useEffect(() => {
    handleSearch();
  }, [search]);

  const getAllData = async (req, res) => {
    try {
      const res = await fetch("/api/hospital/get/allData");

      const data = await res.json();

      if (res.ok) {
        setHospitals(data);
        setAllHospitals(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async (req, res) => {
    try {
      const res = await fetch(`/api/hospital/getdata/${currentUser._id}`);

      const data = await res.json();

      if (res.ok) {
        setHospitals(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
    // getData();
  }, []);

  const sortHospitals = () => {
    const sortedHospitals = [...hospitals];
    if (sortType === "alphabetical") {
      sortedHospitals.sort((a, b) =>
        a.hospitalName.localeCompare(b.hospitalName)
      );
    } else if (sortType === "date") {
      sortedHospitals.sort(
        (a, b) => new Date(a.registrationDate) - new Date(b.registrationDate)
      );
    }
    setHospitals(sortedHospitals);
  };

  const toggleSortType = () => {
    setSortType((prevType) =>
      prevType === "alphabetical" ? "date" : "alphabetical"
    );
  };

  return (
    <>
      <div className="bg-blue-50 h-screen">
        <Header />
        <div className="flex justify-end pr-80">
          <img src={image} alt="" className=" mt-3 w-[83px]  h-[83px]" />
        </div>
        {/* Text and Search */}
        <div className="flex justify-between items-center px-20 mt-1">
          {/* Text */}
          <div>
            <p className="text-[#404040] text-4xl pt-0 font-semibold">
              Hospital Registrations
            </p>
          </div>
          {/* Search */}
          <div className="flex gap-3">
            <div className="flex items-center shadow-md px-4 rounded-md p-2 w-[25rem] justify-between border border-gray-300 bg-white">
              <input
                type="text"
                placeholder="Search"
                className="outline-none ml-1 border-none "
                onChange={(e) => setSearch(e.target.value)}
                // value={search}
              />
              <IoSearch
                className="text-gray-400 ml-1 cursor-pointer "
                onClick={handleSearch}
              />
            </div>
            <div
              onClick={sortHospitals}
              className="ml-2 p-3 border cursor-pointer border-gray-300 bg-white flex items-center shadow-md rounded-md"
            >
              <FaSort className="text-gray-400 " />
            </div>
          </div>
        </div>
        {/* Table */}
        <div className="scrollbar overflow-x-scroll flex">
          <table className=" table-auto overflow-x-scroll m-6  ">
            <thead className="bg-[#0DF5E3] ">
              <tr className="">
                <th className="px-4 py-2 rounded-l-full">No.</th>
                <th className="px-4 py-2">Date & Time</th>
                <th className="px-4 py-2">Hospital Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Phone No.</th>
                <th className="px-4 py-2">City</th>
                <th className="px-4 py-2">State</th>
                <th className="px-4 py-2">Pincode</th>
                <th className="px-4 py-2 ">Hospital Registration Date</th>
                <th className="px-4 py-2 ">Hospital Registration Number</th>
                <th className="px-4 py-2 ">Hospital Registration Photo</th>
                <th className="px-4 py-2 ">Emergency-Ward Number</th>
                <th className="px-4 py-2 rounded-r-full">
                  Number of Ambulance
                </th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map((hospital, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#f5f5f5]"
                  } text-center border-r-ro`}
                >
                  <td className="px-4 py-2 rounded-l-full">{index + 1}</td>
                  <td className="px-4 py-2  ">
                    {new Date(hospital.registrationDate).toLocaleString(
                      "en-IN",
                      {
                        timeZone: "Asia/Kolkata",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )}
                  </td>

                  <td className="px-4 py-2">{hospital.hospitalName}</td>
                  <td className="px-4 py-2">{hospital.email}</td>
                  <td className="px-4 py-2">{hospital.address}</td>
                  <td className="px-4 py-2">{hospital.phoneNumber}</td>
                  <td className="px-4 py-2">{hospital.city}</td>
                  <td className="px-4 py-2">{hospital.state}</td>
                  <td className="px-4 py-2">{hospital.pinCode}</td>
                  <td className="px-4 py-2">
                    {new Date(hospital.registrationDate).toLocaleString()}
                  </td>

                  <td className="px-4 py-2">
                    {hospital.hospitalRegisterNumber}
                  </td>
                  <td className="px-4 py-2 text-blue-500 cursor-pointer">
                    {hospital.registrationCertificateUpload}
                  </td>
                  <td className="px-4 py-2">{hospital.wardNumber}</td>
                  <td className="px-4 py-2  rounded-r-full">
                    {hospital.ambulanceAvailable}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AllData;
