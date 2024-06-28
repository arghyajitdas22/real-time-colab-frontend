import { X } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import useCreateModal from "../../hooks/useCreateModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateModal = () => {
  const { isOpen, close, type, toogleType } = useCreateModal((state) => ({
    isOpen: state.isOpen,
    close: state.close,
    type: state.type,
    toogleType: state.toogleType,
  }));

  const [title, setTitle] = useState("");
  const [members, setMembers] = useState([]);
  const [addedMembers, setAddedMembers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [chosenTeam, setChosenTeam] = useState("");
  const naviagte = useNavigate();

  const handleCreateTeam = async () => {
    const token = localStorage.getItem("token");
    try {
      const formData = {
        title: title,
        memberIds: addedMembers,
      };

      const options = {
        method: "POST",
        url: `http://localhost:8000/api/team`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      };

      const response = await axios.request(options);
      setTitle("");
      setMembers([]);
      setAddedMembers([]);
      close();
      naviagte(`/projects/${response.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateProject = async () => {
    const token = localStorage.getItem("token");
    try {
      const formData = {
        title: title,
        memberIds: addedMembers,
        teamId: chosenTeam,
      };

      const options = {
        method: "POST",
        url: `http://localhost:8000/api/project`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      };

      const response = await axios.request(options);
      setTitle("");
      setMembers([]);
      setAddedMembers([]);
      setChosenTeam("");
      close();
      naviagte(`/project/${response.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddMember = (id) => {
    setAddedMembers([...addedMembers, id]);
    const memberId = Number(id);
    const newMembers = members.filter((member) => member.id !== memberId);
    setMembers(newMembers);
  };

  const getAllUsersforTeamCreation = async () => {
    try {
      const token = localStorage.getItem("token");
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: `http://localhost:8000/api/users`,
      };

      const response = await axios.request(options);
      setMembers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const getTeamsofUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: `http://localhost:8000/api/users/created-teams`,
      };

      const response = await axios.request(options);
      setTeams(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsersFromTheTeam = async (teamId) => {
    try {
      const token = localStorage.getItem("token");
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: `http://localhost:8000/api/team/non-creator-members/${teamId}`,
      };

      const response = await axios.request(options);
      console.log(response.data);
      setMembers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (type === "team") {
      getAllUsersforTeamCreation();
    } else {
      getTeamsofUser();
    }
  }, [type]);

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
                setAddedMembers([]);
                setChosenTeam("");
                setTeams([]);
                close();
              }}
            />
          </div>
          <div className="flex items-center justify-around py-2 px-4">
            <button
              onClick={() => {
                setTitle("");
                setMembers([]);
                setAddedMembers([]);
                setChosenTeam("");
                setTeams([]);
                toogleType("team");
              }}
              className={`text-lg text-[#002d5d] font-medium ${
                type === "team" ? "underline underline-offset-4" : ""
              }`}
            >
              Create Team
            </button>
            <span className="h-6 w-[2px] bg-gray-500"></span>
            <button
              onClick={() => {
                setTitle("");
                setMembers([]);
                setAddedMembers([]);
                setChosenTeam("");
                setTeams([]);
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

          {type === "project" && (
            <div className="flex flex-col gap-2">
              <label htmlFor="choose-team" className="text-sm">
                Choose Team
              </label>
              <select
                name="Choose Team"
                id="choose-team"
                className="w-full py-1 pr-2 pl-1 border border-black focus:outline-none focus:border-2  focus:border-blue-600 rounded-md text-sm"
                onChange={async (e) => {
                  setChosenTeam(e.target.value);
                  await getUsersFromTheTeam(e.target.value);
                }}
              >
                <option value="">Choose a Team to Create Project</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.title}
                  </option>
                ))}
              </select>
              <span className="text-gray-700 text-sm">
                Added Members: {addedMembers.length}
              </span>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="add-members" className="text-sm">
              Add Members
            </label>
            <select
              name="Add Members"
              id="add-members"
              className="w-full py-1 pr-2 pl-1 border border-black focus:outline-none focus:border-2  focus:border-blue-600 rounded-md text-sm"
              onChange={(e) => handleAddMember(e.target.value)}
              disabled={chosenTeam.length === 0 && type === "project"}
            >
              <option value="">Choose an user as Member</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.first_name} {member.last_name}
                </option>
              ))}
            </select>
            <span className="text-gray-700 text-sm">
              Added Members: {addedMembers.length}
            </span>
          </div>
        </div>
        <div className="rounded-b-md border-t border-gray-300 flex items-center justify-end py-2 px-4">
          <button
            type="button"
            className="rounded-md py-1 px-2 bg-blue-500 text-center text-white"
            onClick={() => {
              type === "team" ? handleCreateTeam() : handleCreateProject();
            }}
          >
            Create {type === "team" ? "Team" : "Project"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
