import { X } from "@phosphor-icons/react";
import React, { useState } from "react";
import useCreateModal from "../../hooks/useCreateModal";

const CreateModal = () => {
  const { isOpen, close, type, toogleType } = useCreateModal((state) => ({
    isOpen: state.isOpen,
    close: state.close,
    type: state.type,
    toogleType: state.toogleType,
  }));

  const [title, setTitle] = useState("");
  const [members, setMembers] = useState([]);

  if (!isOpen) return null;
  return (
    <div className="w-screen h-screen bg-black bg-opacity-30 z-[60] absolute flex items-center justify-center overflow-hidden">
      <div className="bg-white rounded-md w-[500px] border border-gray-300 flex flex-col gap-3">
        <div className=" rounded-t-md  border-b border-gray-300">
          <div className="flex items-center justify-end pr-2 pt-2">
            <X
              size={20}
              className="hover:scale-95 basic-trans cursor-pointer"
              onClick={() => {
                setTitle("");
                setMembers([]);
                close();
              }}
            />
          </div>
          <div className="flex items-center justify-around py-2 px-4">
            <button
              onClick={() => {
                setTitle("");
                setMembers([]);
                toogleType("task");
              }}
              className={`text-lg text-[#002d5d] font-medium ${
                type === "task" ? "underline underline-offset-4" : ""
              }`}
            >
              Create Team
            </button>
            <span className="h-6 w-[2px] bg-gray-500"></span>
            <button
              onClick={() => {
                setTitle("");
                setMembers([]);
                toogleType("project");
              }}
              className={`text-lg text-[#002d5d] font-medium ${
                type === "project" ? "underline underline-offset-4" : ""
              }`}
            >
              Create Project
            </button>
          </div>
        </div>
        <div className="py-2 px-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md py-1 px-2 border border-black focus:outline-none focus:border-2  focus:border-blue-600 text-sm"
              placeholder="Task content"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="add-members" className="text-sm">
              Add Members
            </label>
            <select
              name="Add Members"
              id="add-members"
              className="w-full py-1 pr-2 pl-1 border border-black focus:outline-none focus:border-2  focus:border-blue-600 rounded-md text-sm"
              onChange={(e) => setMembers([...members, e.target.value])}
            >
              <option value="">Choose an user as Memeber</option>
              <option value="user_id">User Name</option>
            </select>
            <span className="text-gray-700 text-sm">
              Added Members: {members.length}
            </span>
          </div>
        </div>
        <div className=" rounded-b-md border-t border-gray-300 flex items-center justify-end py-2 px-4">
          <button
            type="button"
            className=" rounded-md py-1 px-2 bg-blue-500 text-center text-white"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
