import React from "react";
import no_user from "../../../assets/no_user_dp.png";
import Image from "../../common/Image";
import { CalendarDots, Eraser, Trash } from "@phosphor-icons/react";
import { Draggable } from "react-beautiful-dnd";
import { formatSelectedDate } from "./TaskModal";
import useTaskModal from "../../../hooks/useTaskModal";
import { useParams } from "react-router-dom";
import axios from "axios";

const TaskCard = ({ task, date, taskNo, assignedTo, index, status }) => {
  const { projectId } = useParams();

  const { open, setContent, setDueDate, toogleMode, setTaskId } = useTaskModal(
    (state) => ({
      open: state.open,
      setContent: state.setContent,
      setDueDate: state.setDueDate,
      toogleMode: state.toogleMode,
      setTaskId: state.setTaskId,
    })
  );

  const handleDeleteTask = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = {
        projectId,
        status,
      };
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: formData,
        url: `http://localhost:8000/api/task/${taskNo}`,
      };
      await axios.request(options);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Draggable draggableId={taskNo.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="w-full rounded-[5px] border border-gray-300 shadow-sm p-2 flex flex-col gap-2 bg-white"
        >
          <p className="max-w-[95%] px-1">{task}</p>
          <span className="p-1 flex items-center gap-1 text-sm font-medium bg-blue-500 bg-opacity-30 w-fit rounded-md">
            <span>Due by:</span>
            <CalendarDots size={16} />
            {formatSelectedDate(new Date(date))}
          </span>
          <div className="flex flex-col px-1 gap-2">
            <span className="text-sm text-gray-600">Task-{taskNo}</span>
            <span className="text-sm text-gray-600">
              Assigned To- <span className=" font-semibold">{assignedTo}</span>
            </span>
            <button
              onClick={handleDeleteTask}
              className="py-1 px-2 flex items-center justify-center gap-1 text-sm font-medium text-red-500 bg-red-500 bg-opacity-30 w-full rounded-md hover:scale-95 basic-trans"
            >
              <Trash size={16} /> Delete Task
            </button>
            <button
              onClick={() => {
                setContent(task);
                setDueDate(new Date(date));
                setTaskId(taskNo);
                toogleMode("edit");
                open();
              }}
              className="py-1 px-2 flex items-center justify-center gap-1 text-sm font-medium text-white bg-black bg-opacity-80 w-full rounded-md hover:scale-95 basic-trans"
            >
              <Eraser size={16} /> Edit Task
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
