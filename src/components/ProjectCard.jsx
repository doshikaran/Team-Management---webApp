import React from "react";

function ProjectCard({ project }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "To Do":
        return "text-red-500";
      case "Completed":
        return "text-green-500";
      case "In Progress":
        return "text-blue-500";
      default:
        return "";
    }
  };

  const statusClasses = getStatusColor(project.status);

  return (
    <div className=" bg-gradient-to-r from-[#d9a7c7] to-[#fffcdc] rounded-xl ">
      <div className=" p-4">
        {/* name */}
        <div className=" text-center">
          <h1 className=" uppercase font-extrabold tracking-widest underline ">
            <a
              className=" hover:text-gray-600"
              href={`/projects/${project.id}`}
            >
              {project.name}
            </a>
          </h1>
        </div>

        {/* sbuject and status */}
        <div className=" flex items-center justify-between mt-2">
          <h1 className=" font-light">{project.subject}</h1>
          <div className="">
            <p
              className={` ${statusClasses} uppercase font-extrabold tracking-widest text-xs `}
            >
              {project.status}
            </p>
          </div>
        </div>

        {/* desc */}
        <div className=" mt-2">
          <p className=" text-gray-800 tracking-widest text-sm">
            {project.desc}
          </p>
        </div>

        {/* view */}
        {/* <div>
        <a className='btn btn-light' href={`/projects/${project.id}`}>
              View
            </a>

        </div> */}
      </div>
    </div>
  );
}

export default ProjectCard;
