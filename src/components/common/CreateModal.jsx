import { X } from "@phosphor-icons/react";
import React, { useState } from "react";
import useCreateModal from "../../hooks/useCreateModal";
import api from '../../api'; // Import your axios instance

const CreateModal = () => {
  const { isOpen, close, type, toogleType } = useCreateModal((state) => ({
    isOpen: state.isOpen,
    close: state.close,
    type: state.type,
    toogleType: state.toogleType,
  }));

  const [title, setTitle] = useState("");
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState("");

  if (!isOpen) return null;

  const handleCreateTeam = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await api.post('/team/create', {
        title,
        creatorId: 1, // Assuming the creator ID is 1 for now, update as needed
      },

      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    
    );

      const team = response.data.team;

      // Add members to the team
      for (const member of members) {
        
        await api.post('/team/add-member', {
          teamId: team.id,
          first_name: member,
        },{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      );
      }

      // Reset the form
      setTitle("");
      setMembers([]);
      setNewMember("");
      close();
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  const handleAddMember = () => {
    // const token = localStorage.getItem('token');
    

    setMembers([...members, newMember]);
    setNewMember("");
  };

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
                setNewMember("");
                close();
              }}
            />
          </div>
          <div className="flex items-center justify-around py-2 px-4">
            <button
              onClick={() => {
                setTitle("");
                setMembers([]);
                setNewMember("");
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
                setNewMember("");
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
              placeholder="Team title"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="add-members" className="text-sm">
              Add Members
            </label>
            <div className="flex">
              <input
                type="text"
                id="add-members"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                className="w-full rounded-md py-1 px-2 border border-black focus:outline-none focus:border-2  focus:border-blue-600 text-sm"
                placeholder="Member username"
              />
              <button
                type="button"
                onClick={handleAddMember}
                className="ml-2 rounded-md py-1 px-2 bg-blue-500 text-center text-white"
              >
                Add
              </button>
            </div>
            <span className="text-gray-700 text-sm">
              Added Members: {members.join(", ")}
            </span>
          </div>
        </div>
        <div className="rounded-b-md border-t border-gray-300 flex items-center justify-end py-2 px-4">
          <button
            type="button"
            className="rounded-md py-1 px-2 bg-blue-500 text-center text-white"
            onClick={handleCreateTeam}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
