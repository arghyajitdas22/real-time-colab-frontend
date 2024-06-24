import React from "react";
import no_user from "../../../assets/no_user_dp.png";
import Image from "../../common/Image";
import { CalendarDots } from "@phosphor-icons/react";
import { Draggable } from "react-beautiful-dnd";

const TaskCard = ({ task, date, taskNo, assignedTo, index }) => {
  return (
    <Draggable draggableId={taskNo.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="w-full rounded-[5px] border border-gray-300 shadow-sm p-2 flex flex-col gap-2 bg-white"
        >
          <p className="max-w-[95%]">{task}</p>
          <span className="p-1 flex items-center gap-1 text-sm font-medium">
            <CalendarDots size={16} />
            {date}
          </span>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Task-{taskNo}</span>
            <Image
              containerStyles={"w-6 h6 rounded-full"}
              imageStyles={"rounded-full object-cover"}
              width={24}
              height={24}
              src={no_user}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
