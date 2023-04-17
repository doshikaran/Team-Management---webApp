import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import { useMutation } from "@apollo/client";
import { UPDATEPROJECT } from "../Mutations/projectMutation";
import { GETAPROJECT } from "../queries/queryProject";

function EditProject({ project }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(project.name);
  const [subject, setSubject] = useState(project.subject);
  const [desc, setDesc] = useState(project.desc);
  const [status, setStatus] = useState(() => {
    switch (project.status) {
      case "To Do":
        return "new";
      case "Completed":
        return "done";
      case "In Progress":
        return "progress";
      default:
        return "";
    }
  });

  const [updateProject] = useMutation(UPDATEPROJECT, {
    variables: { id: project.id, name, desc, subject, status },
    refetchQueries: [{ query: GETAPROJECT, variables: { id: project.id } }],
  });

  const onUpdate = (error) => {
    error.preventDefault();
    if (!name || !subject || !desc || !status) {
      return alert("Please enter everything");
    }
    updateProject(name, subject, status, desc);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className=" mt-10">
      <div>
        <p
          className=" uppercase text-sm tracking-widest font-black cursor-pointer"
          onClick={handleClickOpen}
        >
          update your project
        </p>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <div className="px-6 py-6 lg:px-8">
          <h3 className="mb-4 text-2xl uppercase tracking-widest font-medium text-gray-900 ">
            update your project
          </h3>
          <form onClick={onUpdate} className="space-y-6">
            {/* name */}
            <div>
              <label
                for="name"
                className="block uppercase mb-2 text-xs font-medium text-gray-900"
              >
                update project name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder=""
                required
              />
            </div>
            {/* subject */}
            <div>
              <label
                for="name"
                className="block uppercase mb-2 text-xs font-medium text-gray-900"
              >
                update the subject
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder=""
                required
              />
            </div>
            {/* descript */}
            <div>
              <label
                for="name"
                className="block uppercase mb-2 text-xs font-medium text-gray-900"
              >
                update the description
              </label>
              <textarea
                id="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder=""
                required
              />
            </div>

            {/* status */}
            <div>
              <Box sx={{ minWidth: 200 }}>
                <label
                  for="name"
                  className="block uppercase mb-2 text-xs font-medium text-gray-900 "
                >
                  update the status
                </label>
                <Select
                  labelId="demo-simple-select-label"
                  id="status"
                  value={status}
                  label="Age"
                  sx={{ minWidth: "100%" }}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="new">To Do</MenuItem>
                  <MenuItem value="progress">In Progress</MenuItem>
                  <MenuItem value="done">Completed</MenuItem>
                </Select>
              </Box>
            </div>
            <button
              onSubmit={onUpdate}
              type="submit"
              className="w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              <h1 className=" uppercase ">update</h1>
            </button>
          </form>
        </div>
      </Dialog>
    </div>
  );
}

export default EditProject;
