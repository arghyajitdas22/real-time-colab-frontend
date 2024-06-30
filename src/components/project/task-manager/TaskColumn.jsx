import { Plus } from "@phosphor-icons/react";
import React from "react";
import TaskCard from "./TaskCard";
import { Droppable } from "react-beautiful-dnd";
import useTaskModal from "../../../hooks/useTaskModal";

const TaskColumn = ({ colName, tasks, colId }) => {
  const { open, setStatus } = useTaskModal((state) => ({
    open: state.open,
    setStatus: state.setStatus,
  }));
  return (
    <div className="w-[260px] h-full bg-[#f4f5f7] flex flex-col rounded-[5px] shadow-sm pb-4">
      <div className="w-full flex items-center justify-between px-3 py-2 rounded-t-[5px]">
        <span className="text-sm font-medium text-[#626f86]">
          {colName}
          {"    "}
          {tasks.length}
        </span>
        <Plus
          size={16}
          className=" cursor-pointer hover:scale-105 basic-trans"
          onClick={() => {
            if (colId === "column-1") setStatus("TO_DO");
            else if (colId === "column-2") setStatus("IN_PROGRESS");
            else setStatus("COMPLETED");
            open();
          }}
        />
      </div>
      <Droppable droppableId={colId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col gap-2 px-2 pb-2"
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={index}
                task={task.content}
                taskNo={task.task_id}
                date={task.due_date}
                assignedTo={`${task.assignee.first_name} ${task.assignee.last_name}`}
                index={index}
                status={task.status}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
