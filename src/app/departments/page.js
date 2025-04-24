"use client";

import { User } from "lucide-react";
import Image from "next/image";
import DesignationTable from "@components/DesignationTable";
import Logo from "@assets/Logo.jpeg";
import NavigationBar from "@components/NavigationBar";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import DepartmentTable from "@components/Departmentable";
import axios from "axios";

export default function TaskPage() {
  const [isshowoption, setIsshowoption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All");
  const [designations, setDesignations] = useState([]);

  const fetchDesignation = async () => {
    try {
      const res = await axios.get(
        " /api/user/signup/Designation"
      );
      console.log("Data of designation", res.data);
      setDesignations(res.data.data); // store data in state
    } catch (error) {
      console.log("Error while fetching designation", error);
    }
  };

  useEffect(() => {
    fetchDesignation();
  }, []);

  return (
    <div className="min-h-screen py-6 w-full bg-white overflow-x-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Upper Div */}
        <div className="flex justify-between items-center w-6xl">
          <div className="flex items-center mb-1">
            <div className="h-8 w-28"></div>
            <p className="text-xl font-semibold">Task Management System</p>
          </div>

          <div className="flex items-center mb-3">
            <div className="bg-[#ffba00] rounded-full h-10 w-10 flex justify-center mr-2 items-center">
              <User strokeWidth={2} color="#ffffff" />
            </div>
            <p className="px-1">Hi, Suraj Poswal (admin)</p>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="mb-1 w-6xl">
          <NavigationBar />
        </div>

        {/* Third Div */}
        <div className="flex justify-between mb-8 w-6xl">
          <div className="flex">
            <div className="h-8 w-28"></div>
          <p>
              Review and organize tasks that could receive feedback from the
              support team.
            </p>
          </div>
          <div className="flex flex-col w-[12rem]">
            <label className="mb-2 text-center">Select Departments</label>

            {/* Wrap button + dropdown in a relative container */}
            <div className="relative">
              <div
                onClick={() => setIsshowoption(!isshowoption)}
              className="text-center bg-[#ffba00] rounded-full px-4 py-1 text-lg mb-1 flex items-center justify-center gap-1 cursor-pointer"
              >
                {selectedOption}
                <FontAwesomeIcon icon={faCaretDown} className="w-5" />
              </div>

              {isshowoption && (
                <div className="absolute top-full left-0 w-full bg-[#616262] text-white rounded-[20px] py-2 text-lg z-10 shadow-md text-center max-h-40 overflow-y-auto">
                <div
                  onClick={() => {
                    setSelectedOption("All");
                    setIsshowoption(false);
                  }}
                  className="cursor-pointer py-1 text-sm hover:bg-[#ffba00] hover:rounded-full"
                >
                  All
                </div>
                {designations.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      setSelectedOption(item.designation || item.destination);
                      setIsshowoption(false);
                    }}
                    className="cursor-pointer py-1 text-sm hover:bg-[#ffba00] hover:rounded-full"
                  >
                    {item.designation || item.destination}
                  </div>
                ))}
              </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Task Table */}
      <div className="w-full overflow-hidden">
      <DepartmentTable  designationOption = {selectedOption} />
      </div>
    </div>
  );
}
