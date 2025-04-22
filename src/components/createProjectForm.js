"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


export default function TaskForm({onData, onClose}) {
  const [formData, setFormData] = useState({
    id:"",
    client: "",
    project: "",
    subject: "",
    createdBy: "",    
    assignedTo: "",
    startDate: "",
    deadline: "",
    time: "",
    status: "",
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("/api/user/signup/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      console.log("API Response:", result);
  
      onData(result.task); // return saved task with ID
      onClose();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };
  
  return (
<form
  onSubmit={handleSubmit}
  className="p-8 max-w-3xl top-[-20vh] mx-auto space-y-8 border border-gray-200 rounded-2xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] relative z-[999]"
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

  {/* Form Title */}
  <h2 className="text-3xl font-bold text-center text-gray-800">📝 Create New Task</h2>

  {/* Inputs */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <input
      type="text"
      name="client"
      value={formData.client}
      onChange={handleChange}
      placeholder="Client"
      className="px-5 py-3 rounded-lg border border-[#ffba00] bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ffba00] placeholder-gray-400 text-gray-800"
    />
    <input
      type="text"
      name="project"
      value={formData.project}
      onChange={handleChange}
      placeholder="Project Name"
      className="px-5 py-3 rounded-lg border border-[#ffba00] bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ffba00] placeholder-gray-400 text-gray-800"
    />
    <input
      type="text"
      name="subject"
      value={formData.subject}
      onChange={handleChange}
      placeholder="Subject"
      className="px-5 py-3 rounded-lg border border-[#ffba00] bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ffba00] placeholder-gray-400 text-gray-800"
    />
    <input
      type="text"
      name="createdBy"
      value={formData.createdBy}
      onChange={handleChange}
      placeholder="Created By"
      className="px-5 py-3 rounded-lg border border-[#ffba00] bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ffba00] placeholder-gray-400 text-gray-800"
    />
    <input
      type="text"
      name="assignedTo"
      value={formData.assignedTo}
      onChange={handleChange}
      placeholder="Assign To"
      className="px-5 py-3 rounded-lg border border-[#ffba00] bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ffba00] placeholder-gray-400 text-gray-800"
    />
    <input
      type="date"
      name="startDate"
      value={formData.startDate}
      onChange={handleChange}
      className="px-5 py-3 rounded-lg border border-[#ffba00] bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ffba00] text-gray-800"
    />
    <input
      type="date"
      name="deadline"
      value={formData.deadline}
      onChange={handleChange}
      className="px-5 py-3 rounded-lg border border-[#ffba00] bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ffba00] text-gray-800"
    />
    <input
      type="time"
      name="time"
      value={formData.time}
      onChange={handleChange}
      className="px-5 py-3 rounded-lg border border-[#ffba00] bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ffba00] text-gray-800"
    />
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full bg-[#ffba00] hover:bg-[#e6a900] text-white font-semibold py-3 rounded-[2rem] transition-all duration-300"
  >
    ➕ Add Task
  </button>
</form>


  );
}
