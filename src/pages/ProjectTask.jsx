import React from "react";
import Projectlayout from "../components/common/layouts/Project.layout";
import TaskManager from "../components/project/task-manager/TaskManager";

const ProjectTask = () => {
  return (
    <Projectlayout>
      <TaskManager />
    </Projectlayout>
  );
};

export default ProjectTask;
