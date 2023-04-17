import { useQuery } from "@apollo/client";
import React from "react";
import { GETPROJECTS } from "../queries/queryProject";
import ProjectCard from "./ProjectCard";

function Projects() {
  const { loading, error, data } = useQuery(GETPROJECTS);

  if (loading)
    return (
      <p className=" text-sm font-bold tracking-widest text-gray-900">
        please wait, loading
      </p>
    );
  if (error)
    return (
      <p className=" text-sm font-bold tracking-widest text-gray-900">
        something isnt right
      </p>
    );

  return (
    <div className=" my-5" >
      {data.projects.length > 0 ? (
        <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-4">
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <h1 className=" text-black font-bold tracking-widest uppercase text-sm">
          Please add a project
        </h1>
      )}
    </div>
  );
}

export default Projects;
