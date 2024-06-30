import React, { useEffect, useState } from "react";
import SearchBar from "../../common/SearchBar";
import { UserCircle } from "@phosphor-icons/react/dist/ssr";
// import { UserPlus } from "@phosphor-icons/react";
import TaskColumn from "./TaskColumn";
import { DragDropContext } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import axios from "axios";

const TaskManager = () => {
  const [listState, setListState] = useState(null);
  const { projectId } = useParams();

  const fetchAllTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: `http://localhost:8000/api/task/${projectId}`,
      };
      const response = await axios.request(options);

      const taskArray = response.data.tasks;
      const taskObj = {};
      taskArray.forEach((task) => {
        taskObj[task.task_id] = task;
      });
      const to_do_ids = response.data.taskOrder.to_do_ids;
      const in_progress_ids = response.data.taskOrder.in_progress_ids;
      const completed_ids = response.data.taskOrder.completed_ids;

      const data = {
        tasks: taskObj,
        columns: {
          "column-1": {
            id: "column-1",
            title: "TO-DO",
            taskIds: to_do_ids,
          },
          "column-2": {
            id: "column-2",
            title: "IN-PROGRESS",
            taskIds: in_progress_ids,
          },
          "column-3": {
            id: "column-3",
            title: "COMPLETED",
            taskIds: completed_ids,
          },
        },
        // Facilitate reordering of the columns
        columnOrder: ["column-1", "column-2", "column-3"],
      };

      setListState(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, [projectId]);

  const [searchVal, setSearchVal] = useState("");
  const handleSearch = (e) => {
    setSearchVal(e.target.value);
  };

  const onDragEnd = (result) => {
    console.log(result);
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const start = listState.columns[source.droppableId];
    const finish = listState.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...listState,
        columns: {
          ...listState.columns,
          [newColumn.id]: newColumn,
        },
      };

      setListState(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    // Update the state
    const newState = {
      ...listState,
      columns: {
        ...listState.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    // Update the database
    const task_id = draggableId;
    let status = "";
    if (destination.droppableId === "column-1") status = "TO_DO";
    else if (destination.droppableId === "column-2") status = "IN_PROGRESS";
    else status = "COMPLETED";
    const token = localStorage.getItem("token");
    const formadata = {
      to_do_ids: newState.columns["column-1"].taskIds,
      in_progress_ids: newState.columns["column-2"].taskIds,
      completed_ids: newState.columns["column-3"].taskIds,
      taskId: task_id,
      status,
    };

    const options = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formadata,
      url: `http://localhost:8000/api/task/${projectId}`,
    };
    axios
      .request(options)
      .then(() => {
        setListState(newState);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="py-5 px-10 flex flex-col gap-4 overflow-y-auto w-full">
      <p className="flex items-center gap-4 text-sm text-[#44546f]">
        <span>Projects</span>
        <span>/</span>
        <span>teamName</span>
      </p>

      <h1 className="text-[#172b4d] text-2xl font-bold">Project Name</h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex items-center gap-2">
          {listState &&
            listState.columnOrder.map((columnId) => {
              const column = listState.columns[columnId];
              const tasks = column.taskIds.map(
                (taskId) => listState.tasks[taskId]
              );

              return (
                <TaskColumn
                  key={column.id}
                  colName={column.title}
                  tasks={tasks}
                  colId={columnId}
                />
              );
            })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskManager;
