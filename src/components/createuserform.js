"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function TaskForm({ onData, onClose }) {
  const [formData, setFormData] = useState({
    user: "",
    designation: "",
    department: "",
    empLayer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      ...formData,
      _id: Date.now().toString(), // mock ID
    };

    onData(newUser);
    try {
      const response = await axios.post("http://localhost:3000/api/user/signup/createuser", newUser);
      console.log("API Response:", response);

      onData(response.data.task); // Adjust if your API returns something else
      onClose();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    // <form
    //   onSubmit={handleSubmit}
    //   className="p-6 max-w-2xl mx-auto space-y-5 border rounded-2xl bg-white shadow-[0_10px_60px_rgba(0,0,0,0.4)] absolute z-[999]"
    // >
    //   <div className="w-full flex justify-end">
    //     <span
    //       onClick={onClose}
    //       className="hover:scale-[120%] transition-transform duration-500 hover:rotate-[270deg]"
    //     >
    //       <FontAwesomeIcon icon={faXmark} className="text-[#ffba00] cursor-pointer" />
    //     </span>
    //   </div>

    //   <h2 className="text-2xl font-semibold text-center text-gray-800">📝 Create New user</h2>

    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //     <div>
    //       <label className="block border px-4 py-2 border-[#ffba00] text-sm font-semibold text-gray-800 mb-2">User Name</label>
    //       <input type="text" name="user" value={formData.user} onChange={handleChange} className="input-field" />
    //     </div>
    //     <div>
    //       <label className="block border px-4 py-2 border-[#ffba00] text-sm font-semibold text-gray-800 mb-2">Designation</label>
    //       <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="input-field" />
    //     </div>
    //     <div>
    //       <label className="block border px-4 py-2 border-[#ffba00] text-sm font-semibold text-gray-800 mb-2">Department</label>
    //       <input type="text" name="department" value={formData.department} onChange={handleChange} className="input-field" />
    //     </div>
    //     <div>
    //       <label className="block border px-4 py-2 border-[#ffba00] text-sm font-semibold text-gray-800 mb-2">Emp. Layer</label>
    //       <input type="text" name="empLayer" value={formData.empLayer} onChange={handleChange} className="input-field" />
    //     </div>
    //   </div>

    //   <button
    //     type="submit"
    //     className="w-full bg-[#ffba00] hover:scale-[102%] text-white font-semibold py-3 rounded-xl transition-all duration-200"
    //   >
    //     Add Task
    //   </button>
    // </form>
    <form
  onSubmit={handleSubmit}
  className="p-8 max-w-2xl mx-auto space-y-6 border border-gray-200 rounded-2xl bg-white shadow-[0_10px_60px_rgba(0,0,0,0.1)] relative z-[999]"
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

  {/* Title */}
  <h2 className="text-3xl font-bold text-center text-gray-800">📝 Create New User</h2>

  {/* Input Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* User Name */}
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">User Name</label>
      <input
        type="text"
        name="user"
        value={formData.user}
        onChange={handleChange}
        placeholder="Enter name"
        className="px-4 py-2 border border-[#ffba00] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffba00] bg-gray-50"
      />
    </div>

    {/* Designation */}
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">Designation</label>
      <input
        type="text"
        name="designation"
        value={formData.designation}
        onChange={handleChange}
        placeholder="Enter designation"
        className="px-4 py-2 border border-[#ffba00] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffba00] bg-gray-50"
      />
    </div>

    {/* Department */}
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">Department</label>
      <input
        type="text"
        name="department"
        value={formData.department}
        onChange={handleChange}
        placeholder="Enter department"
        className="px-4 py-2 border border-[#ffba00] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffba00] bg-gray-50"
      />
    </div>

    {/* Employee Layer */}
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">Emp. Layer</label>
      <input
        type="text"
        name="empLayer"
        value={formData.empLayer}
        onChange={handleChange}
        placeholder="Enter layer"
        className="px-4 py-2 border border-[#ffba00] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffba00] bg-gray-50"
      />
    </div>
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full bg-[#ffba00] hover:bg-[#e6a900] text-white font-semibold py-3 rounded-[2rem] transition-all duration-300"
  >
    ➕ Add User
  </button>
</form>

  );
}
