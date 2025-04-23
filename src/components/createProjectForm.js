"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function TaskForm({ onData, onClose, refreshAftersumbit }) {
  const [formData, setFormData] = useState({
    id: "",
    client: "",
    project: "",
    subject: "",
    createdBy: "",
    assignedTo: "",
    assignToDesignation:"",
    startDate: "",
    deadline: "",
    time: "",
    status: "Open" ,
  });

  const [users, setUsers] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/user/signup/createuser"
      );
      console.log(
        "response from assignedTo data from create tabel",
        response.data.result
      );
      setUsers(
        response.data.result.map((user) => ({
          ...user,
          designation: user.designation || "",
        }))
      );
    } catch (error) {
      console.log("error", error);
    }
  };


  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "assignedTo") {
      const selectedUser = users.find(user => user.user === value);   
      setFormData(prev => ({ 
        ...prev, 
        assignedTo: value,
        assignToDesignation: selectedUser ? selectedUser.designation : "" 
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const response = await axios.post("/api/user/signup/tasks", formData);

      if (response.data && response.data.task) {
        onData(response.data.task);
      }
      refreshAftersumbit();
      onClose(response.data.task);

    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-2xl mx-auto space-y-5 border rounded-2xl bg-white shadow-[0_10px_60px_rgba(0,0,0,0.4)] absolute z-[999]"
    >
      <div className="w-full flex justify-end ">
        <span
          onClick={onClose}
          className="hover:scale-[120%] transition-transform duration-500 hover:rotate-[270deg] "
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="text-[#ffba00] cursor-pointer"
          />
        </span>
      </div>
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        📝 Create New Task
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="client"
          value={formData.client}
          onChange={handleChange}
          placeholder="Client"
          className="input-field"
        />
        <input
          type="text"
          name="project"
          value={formData.project}
          onChange={handleChange}
          placeholder="Project Name"
          className="input-field"
        />
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="input-field"
        />
        <input
          type="text"
          name="createdBy"
          value={formData.createdBy}
          onChange={handleChange}
          placeholder="Created By"
          className="input-field"
        />
        <select
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user._id} value={user.user}>
              {user.user},
              {user.designation}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="input-field"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#ffba00] hover:scale-[102%] text-white font-semibold py-3 rounded-xl transition-all duration-200"
      >
        Add Task
      </button>
    </form>
  );
}
