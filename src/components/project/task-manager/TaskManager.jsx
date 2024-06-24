import React, { useState } from "react";
import SearchBar from "../../common/SearchBar";
import { UserCircle } from "@phosphor-icons/react/dist/ssr";
import { UserPlus } from "@phosphor-icons/react";
import TaskColumn from "./TaskColumn";
import { DragDropContext } from "react-beautiful-dnd";

const TaskManager = () => {
  const INITIAL_DATA = {
    tasks: {
      1: {
        id: 1,
        content: "Configure Next.js application",
        date: "2021-09-01",
        assignedTo: "John",
      },
      2: {
        id: 2,
        content: "Configure Next.js and tailwind ",
        date: "2021-09-02",
        assignedTo: "Aron",
      },
      3: {
        id: 3,
        content: "Create sidebar navigation menu",
        date: "2021-09-03",
        assignedTo: "Smith",
      },
      4: {
        id: 4,
        content: "Create page footer",
        date: "2021-09-04",
        assignedTo: "Carol",
      },
      5: {
        id: 5,
        content: "Create page navigation menu",
        date: "2021-09-05",
        assignedTo: "Chris",
      },
      6: {
        id: 6,
        content: "Create page layout",
        date: "2021-09-06",
        assignedTo: "Angela",
      },
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "TO-DO",
        taskIds: [1, 2, 3, 4, 5, 6],
      },
      "column-2": {
        id: "column-2",
        title: "IN-PROGRESS",
        taskIds: [],
      },
      "column-3": {
        id: "column-3",
        title: "COMPLETED",
        taskIds: [],
      },
    },
    // Facilitate reordering of the columns
    columnOrder: ["column-1", "column-2", "column-3"],
  };

  const [listState, setListState] = useState(INITIAL_DATA);

  const [searchVal, setSearchVal] = useState("");
  const handleSearch = (e) => {
    setSearchVal(e.target.value);
  };

  return (
    <div className="py-5 px-10 flex flex-col gap-4 overflow-y-auto w-full">
      <p className="flex items-center gap-4 text-sm text-[#44546f]">
        <span>Projects</span>
        <span>/</span>
        <span>teamName</span>
      </p>

      <h1 className="text-[#172b4d] text-2xl font-bold">Project Name</h1>

      <div className="flex items-center gap-6">
        <SearchBar
          iconSize={16}
          iconStyles={"left-2 text-gray-700"}
          placeholder={"Search Tasks"}
          styles={"pl-7 py-1"}
          val={searchVal}
          handleSearch={handleSearch}
        />
        {/* profile images stacked for first 5 and then +left */}
        <div className="flex items-center gap-1">
          <div className="flex items-center -space-x-3">
            <UserCircle size={36} className="z-40 bg-white rounded-full" />
            <UserCircle size={36} className="z-30 bg-white rounded-full" />
            <UserCircle size={36} className="z-20 bg-white rounded-full" />
            <UserCircle size={36} className="z-10 bg-white rounded-full" />
            <UserCircle size={36} />
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-sm text-blue-950">
            +6
          </div>
        </div>
        {/* add memeber button which opens modal for adding member */}
        <button
          type="button"
          className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-sm text-blue-950 hover:scale-95 basic-trans"
        >
          <UserPlus size={18} className="text-blue-950" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        {listState.columnOrder.map((columnId) => {
          const column = listState.columns[columnId];
          const tasks = column.taskIds.map((taskId) => listState.tasks[taskId]);

          return (
            <TaskColumn key={column.id} colName={column.title} tasks={tasks} />
          );
        })}
      </div>
    </div>
  );
};

export default TaskManager;
