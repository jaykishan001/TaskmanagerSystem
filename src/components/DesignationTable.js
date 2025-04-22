"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown ,faCalendarDays} from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { faClock } from "@fortawesome/free-solid-svg-icons";

import CreateTask from "./createDesignationForm"
import { useRef } from "react";
import DesignationForm from "./createDesignationForm";


const TaskTable = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [tasks, setTasks] = useState([
   
  ]);

  const statuses = ["Done", "Pending", "Late", "In Review", "Open"];

  const [selectedStatus, setSelectedStatus] = useState("Open");
  const [showForm, setShowForm] = useState(false);
  const [count, setCount] = useState(tasks.length + 1);
  const [showOPtion, setShowOption] = useState(null);
  const [showCalender, setShowCalender] = useState(false)
  const [activePicker, setActivePicker] = useState({ id: null, field: null });
  const [searchTerm, setSearchTerm]= useState("")
  const [showSuggstion, setShowSuggstion] = useState(false)
  const [highlightedRow, setHighlightedRow] = useState(null);


// Create a ref object to store refs for each task row
const rowRefs = useRef({});


  const [newTask, setNewTask] = useState({
    client: "",
    project: "",
    subject: "",
    createdBy: "",
    assignedTo: "",
    startDate: "",
    time: "",
    deadline: "",
    status: "Open",
    Designation: ""
  });

  const statusHandler = (id, newStatus) => {
    // console.log(id);
    // console.log(newStatus);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setNewTask({
      id: count,
      client: "",
      project: "",
      subject: "",
      createdBy: "",
      assignedTo: "",
      startDate: "",
      time: "",
      deadline: "",
      status: "Open",
      Designation: ""
    });
    setTasks([...tasks, newTask]);
    setCount(count + 1);
    setShowForm(false);

    console.log(count);
  };

  const handleClose = (id) => {
    setTasks(tasks.filter((task) => task.id != id));
  };

  const handleChildData = (data)=>{
    setTasks((prev) => [...prev, data]); 
  }
  const handlehiddeForm =() =>{
    setShowForm(false)
  }

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      setShowSuggstion(true);
    } else {
      setShowSuggstion(false);
    }
  }, [searchTerm]);


  const handleAddNewUser = () => {
    setTasks((prev) => [
      ...prev,
      {
        id: count,
        client: "",
        project: "",
        subject: "",
        createdBy: "",
        assignedTo: "",
        startDate: "",
        deadline: "",
        time: "",
        status: "",
        isNew: true,
        Designation: ""
      },
    ]);
    setCount(count + 1);
  };
  

  return (
    <>
    {showForm &&
     <div className="absolute w-[100vw] h-fit flex justify-center items-center">
     <CreateTask
        onData={handleChildData}
        onClose={handlehiddeForm}/>
   </div>
    }
   
    
    <div className="flex relative mx-auto ">
      
      <div className="  mx-auto w-7xl">
        {/* Search Bar */}
        <div className="flex justify-between mb-3">
          <div className="flex items-center">
            <p className=" pr-2 text-lg font-semibold">Search :</p>
            <input

              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
              placeholder="Search by Client Name or Project Name"
              className="w-96 py-1 pl-6 px-1 border border-none bg-gray-200 rounded-full focus:outline-none focus:ring-2"
            /> 
          </div>
          { searchTerm &&
          <div className="w-96 max-h-[200px] overflow-y-auto rounded-[15px] absolute top-[5vh] left-[11vw] py-2 bg-white border-2 border-[#ffba00] z-50 shadow-md">
          {filteredSuggestions.map((suggestion, i) => (
            <div
              key={i}
              onClick={() => {
                setSearchTerm(suggestion.subject);  // Or project/client etc.
                setShowSuggstion(false);

                const targetRow = rowRefs.current[suggestion.id];
                if (targetRow) {
                  targetRow.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                  });
                }
                // 👇 Highlight row for some time
                setHighlightedRow(suggestion.id);
                setTimeout(() => {
                  setHighlightedRow(null);
                }, 2000); // highlight for 2 seconds
              }}
              className="cursor-pointer px-4 py-2 hover:bg-[#ffba00]  transition-all"
            >
              {suggestion.client} - {suggestion.project}
            </div>
          ))}
          {filteredSuggestions.length === 0 && (
            <div className="text-center text-gray-600 py-2">No results found.</div>
          )}
        </div>

          }
          
          <div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-200 "
            >
              Create Designation
            </button>
          </div>
        </div>

        {/* Task Table */}
        <div className="h-[44vh] w-fit overflow-y-auto scroll scrollbar">
          <div className=" rounded-[20px] border-2 border-[#ffba00] h-[44vh] me-2 overflow-x-hidden">
          <table className="  text-center w-7xl " style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead className=" text-sm">
              <tr className="text-[1rem]">
                {[
                  "S no.",
                  "Designation",
                  "Client",
                  "Project Name",
                  "Subject",
                  "Created By",
                  "Assign To",
                  "Start Date",
                  "Deadline",
                  "Time",
                  "Status",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="border border-[#ffba00] px-4 py-2"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="w-8xl text-sm">
            
              
                          </tbody>
          </table>
          </div>
        </div>
        <button
            onClick={handleAddNewUser}
            className="mt-4 px-6 py-2 bg-[#ffba00] border border-[#ffba00] rounded-full"
          >
            + Add New User
          </button>
      </div>
    </div>
    </>
  );
};

export default TaskTable;
