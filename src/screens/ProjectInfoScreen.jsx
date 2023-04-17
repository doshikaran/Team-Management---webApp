import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GETAPROJECT, GETPROJECTS } from "../queries/queryProject";
import MemberDetails from "../components/MemberDetails";
import { FiArrowLeft } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { DELETEPROJECT } from "../Mutations/projectMutation";
import EditProject from "../components/EditProject";

function ProjectInfoScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, data } = useQuery(GETAPROJECT, { variables: { id } });

  const [deleteProject] = useMutation(DELETEPROJECT, {
    variables: { id: id },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GETPROJECTS }],
  });

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

  const statusClasses = getStatusColor(data.project.status);

  return (
    <div className=" bg-gradient-to-r from-[#ACBB78] to-[#F7F8F8] mt-10 w-1/2 mx-auto p-10 h-1/2 rounded-xl">
      <div>
        {/* name */}
        <div className=" items-center">
          <div className=" flex  items-center justify-between">
            <Link to="/">
              <FiArrowLeft />
            </Link>
            <button onClick={deleteProject}>
              <AiOutlineDelete />
            </button>
          </div>
          <h1 className=" uppercase text-xl tracking-widest text-center font-extrabold underline">
            {data.project.name}
          </h1>
        </div>

        {/* suject status */}
        <div className=" mt-5 flex items-center justify-between lg:flex-row md:flex-col sm:flex-col">
          <p>{data.project.subject}</p>
          <p
            className={` ${statusClasses} uppercase font-extrabold tracking-widest text-xs `}
          >
            {data.project.status}
          </p>
        </div>

        <p className=" mt-10 font-medium tracking-widest">
          {data.project.desc}
        </p>

        <MemberDetails member={data.project.member} />
        <EditProject project={data.project}/>
      </div>
    </div>
  );
}

export default ProjectInfoScreen;
