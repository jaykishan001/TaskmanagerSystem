"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function DesignationForm({ onData, onClose }) {
  const [designation, setDesignation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/user/signup/Designation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ designation }),
      });

      const result = await response.json();
      console.log("API Response:", result);

      onData(result.designation); // assuming backend returns saved designation
      onClose();
    } catch (error) {
      console.error("Error saving designation:", error);
    }
  };

  return (
    // <form
    //   onSubmit={handleSubmit}
    //   className="p-6 max-w-md mx-auto space-y-5 border rounded-2xl bg-white shadow-[0_10px_60px_rgba(0,0,0,0.4)] absolute z-[999]"
    // >
    //   <div className="w-full flex justify-end">
    //     <span
    //       onClick={onClose}
    //       className="hover:scale-[120%] transition-transform duration-500 hover:rotate-[270deg]"
    //     >
    //       <FontAwesomeIcon icon={faXmark} className="text-[#ffba00] cursor-pointer" />
    //     </span>
    //   </div>

    //   <h2 className="text-2xl font-semibold text-center text-gray-800">🏷️ Add Designation</h2>

    //   <input
    //     type="text"
    //     name="designation"
    //     value={designation}
    //     onChange={(e) => setDesignation(e.target.value)}
    //     placeholder="Enter Designation"
    //     className="input-field w-full"
    //     required
    //   />

    //   <button
    //     type="submit"
    //     className="w-full bg-[#ffba00] hover:scale-[102%] text-white font-semibold py-3 rounded-xl transition-all duration-200"
    //   >
    //     Save Designation
    //   </button>
    // </form>
    <form
  onSubmit={handleSubmit}
  className="p-8 max-w-md mx-auto space-y-6 border border-gray-200 rounded-2xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] relative z-[999]"
>
  {/* Close Button */}
  <div className="flex justify-end">
    <span
      onClick={onClose}
      className="hover:scale-125 transition-transform duration-300 hover:rotate-180"
    >
      <FontAwesomeIcon icon={faXmark} className="text-[#ffba00] text-xl cursor-pointer" />
    </span>
  </div>

  {/* Heading */}
  <h2 className="text-3xl font-bold text-center text-gray-800">🏷️ Add Departments</h2>

  {/* Designation Input */}
  <div>
    <input
      type="text"
      name="designation"
      value={designation}
      onChange={(e) => setDesignation(e.target.value)}
      placeholder="Enter Departments"
      className="w-full px-3 py-2 border border-[#ffba00] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffba00] bg-gray-50 text-gray-800 placeholder-gray-400"
      required
    />
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className=" w-full m-auto bg-[#ffba00] hover:bg-[#e6a900] text-white font-semibold py-2 transition-all duration-300 rounded-[2rem]"
  >
    💾 Save Departments
  </button>
</form>

  );
}
