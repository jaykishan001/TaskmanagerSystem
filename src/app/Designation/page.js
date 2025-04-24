"use client";

import { User } from "lucide-react";
import Image from "next/image";
import DesignationTable from "@components/DesignationTable";
import Logo from "@assets/Logo.jpeg";
import NavigationBar from "@components/NavigationBar";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function TaskPage() {
  const [isshowoption, setIsshowoption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All");
  const [designations, setDesignations] = useState([]);

  const fetchDesignation = async () => {
    try {
      const res = await axios.get(
        "/api/user/signup/Designation"
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
          </div>
        </div>
      </div>

      {/* Task Table */}
      <div className="w-full overflow-hidden">
        <DesignationTable selectedDepartment={selectedOption} />
      </div>
    </div>
  );
}
