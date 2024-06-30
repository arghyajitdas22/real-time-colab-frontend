import React, { useEffect, useRef, useState } from "react";
import useTaskModal from "../../../hooks/useTaskModal";
import { CalendarBlank, X } from "@phosphor-icons/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useParams } from "react-router-dom";
import axios from "axios";

export const formatSelectedDate = (date) => {
  if (!date) {
    return "Enter Due Date";
  }

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const TaskModal = () => {
  const {
    isOpen,
    close,
    status,
    setStatus,
    content,
    setContent,
    dueDate,
    setDueDate,
    mode,
    task_id,
  } = useTaskModal((state) => ({
    isOpen: state.isOpen,
    close: state.close,
    status: state.status,
    setStatus: state.setStatus,
    content: state.content,
    setContent: state.setContent,
    dueDate: state.dueDate,
    setDueDate: state.setDueDate,
    mode: state.mode,
    task_id: state.task_id,
  }));
  const { projectId } = useParams();
  const [showCalender, setShowCalender] = useState(false);
  const dropRef = useRef(null);
  const [members, setMembers] = useState([]);
  const [assignedUser, setAssignedUser] = useState();

  const handleDateChange = (date) => {
    if (date) {
      const selectedDate = new Date(date.toISOString());
      setDueDate(selectedDate);
    }
    setShowCalender(false);
  };

  const getProjectMembers = async () => {
    try {
      const token = localStorage.getItem("token");
      const options = {
        method: "GET",
        url: `http://localhost:8000/api/project/members/${projectId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.request(options);
      setMembers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjectMembers();
  }, [projectId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropRef.current && !dropRef.current.contains(event.target)) {
        setShowCalender(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropRef]);

  const handleCreateTask = async () => {
    try {
      const token = localStorage.getItem("token");

      const formData = {
        status,
        content,
        due_date: dueDate,
        projectId,
        assigneeId: assignedUser,
      };

      const options = {
        method: "POST",
        url: `http://localhost:8000/api/task`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      };
      const response = await axios.request(options);
      console.log(response.data);
      close();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTask = async () => {
    try {
      const token = localStorage.getItem("token");

      const formData = {
        content,
        due_date: dueDate,
      };

      const options = {
        method: "PATCH",
        url: `http://localhost:8000/api/task/update/${task_id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      };
      await axios.request(options);
      window.location.reload();
      close();
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="w-screen h-screen bg-black bg-opacity-30 z-[60] absolute flex items-center justify-center overflow-hidden">
      <div className="bg-white rounded-md w-[500px] border border-gray-300 flex flex-col gap-3">
        <div className=" rounded-t-md py-2 px-4 border-b border-gray-300 flex items-center justify-between">
          <span className="text-lg text-[#002d5d] font-medium">
            {mode === "create" ? "Create" : "Edit"} Task
          </span>
          <X
            size={20}
            className="hover:scale-95 basic-trans cursor-pointer"
            onClick={() => close()}
          />
        </div>
        <div className="py-2 px-4 flex flex-col gap-4">
          {mode === "create" && (
            <div className="flex flex-col gap-2">
              <label htmlFor="task-status" className="text-sm">
                Status
              </label>
              <select
                name="status"
                id="task-status"
                className="w-[120px] py-1 pr-2 pl-1 border border-black focus:outline-none focus:border-2  focus:border-blue-600 rounded-md text-sm"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="TO_DO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="task-content" className="text-sm">
              Content
            </label>
            <input
              type="text"
              id="task-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-md py-1 px-2 border border-black focus:outline-none focus:border-2  focus:border-blue-600 text-sm"
              placeholder="Task content"
            />
          </div>

          {mode === "create" && (
            <div className="flex flex-col gap-2">
              <label htmlFor="assigned-to" className="text-sm">
                Assignee
              </label>
              <select
                name="assignedTo"
                id="assigned-to"
                className="w-full py-1 pr-2 pl-1 border border-black focus:outline-none focus:border-2  focus:border-blue-600 rounded-md text-sm"
                onChange={(e) => setAssignedUser(e.target.value)}
              >
                <option value="">Choose an user as Assignee</option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.first_name} {member.last_name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex flex-col gap-2 relative">
            <label htmlFor="due-date" className="text-sm">
              Due Date
            </label>
            <div
              onClick={() => setShowCalender(!showCalender)}
              className={`py-1 px-2 flex items-center justify-between ${
                dueDate ? "text-black" : "text-[#676767]"
              } text-sm ${
                dueDate ? "border-2 border-blue-600" : "border border-black"
              } cursor-pointer rounded-md`}
            >
              <span>{formatSelectedDate(dueDate)}</span>
              <span className=" cursor-pointer">
                <CalendarBlank size={20} />
              </span>
            </div>

            {showCalender && (
              <div ref={dropRef} className="absolute right-0 bottom-0">
                <Calendar onChange={handleDateChange} value={dueDate} />
              </div>
            )}
          </div>
        </div>

        <div className=" rounded-b-md border-t border-gray-300 flex items-center justify-end py-2 px-4">
          <button
            type="button"
            className=" rounded-md py-1 px-2 bg-blue-500 text-center text-white"
            onClick={() => {
              if (mode === "create") handleCreateTask();
              else handleEditTask();
            }}
          >
            {mode === "create" ? "Create" : "Edit"} Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
