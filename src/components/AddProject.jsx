import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { useMutation, useQuery } from "@apollo/client";
import { GETMEMBERS } from "../queries/queryMember";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { ADDPROJECT } from "../Mutations/projectMutation";
import { GETPROJECTS } from "../queries/queryProject";

function AddProject() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("new");
  const [memberId, setMemberId] = useState("");

  const [addNewProject] = useMutation(ADDPROJECT, {
    variables: { name, desc, memberId, status, subject },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GETPROJECTS });
      cache.writeQuery({
        query: GETPROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const { loading, error, data } = useQuery(GETMEMBERS);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onAdd = (error) => {
    error.preventDefault();
    if (name === "" || subject === "" || desc === "" || memberId === "" || status === "") {
      return alert("Please enter everything");
    }
    addNewProject(name, subject, status, memberId, desc);

    setName("");
    setSubject("");
    setDesc("");
    setMemberId("");
    setStatus("new");
  };

  return (
    <>
      {!loading && !error && (
        <>
          <div className=" mt-5">
            <a
              onClick={handleClickOpen}
              href="#_"
              className="relative inline-block px-4 py-2 font-medium group"
            >
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
              <div>
                <span className="relative text-black group-hover:text-white uppercase text-sm">
                  add a project
                </span>
              </div>
            </a>

            <Dialog open={open} onClose={handleClose}>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-2xl uppercase tracking-widest font-medium text-gray-900 ">
                  add a new project
                </h3>
                <form onClick={onAdd} className="space-y-6">
                  {/* status */}
                  <div>
                    <Box sx={{ minWidth: 200 }}>
                      <label
                        for="name"
                        className="block uppercase mb-2 text-xs font-medium text-gray-900 "
                      >
                        Enter the status
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
                  {/* member */}
                  <div>
                    <Box sx={{ minWidth: 200 }}>
                      <label
                        for="name"
                        className="block uppercase mb-2 text-xs font-medium text-gray-900 "
                      >
                        Enter the member id
                      </label>
                      <Select
                        labelId="demo-simple-select-label"
                        id="memberid"
                        value={memberId}
                        label="Age"
                        sx={{ minWidth: "100%" }}
                        onChange={(e) => setMemberId(e.target.value)}
                      >
                        {/* <MenuItem value=""></MenuItem> */}
                        {data.members.map((member) => (
                          <MenuItem key={member.id} value={member.id}>
                            {member.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                  </div>
                  {/* name */}
                  <div>
                    <label
                      for="name"
                      className="block uppercase mb-2 text-xs font-medium text-gray-900"
                    >
                      Enter project name
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
                      Enter the subject
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
                      Enter a short description
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
                  <button
                    // onSubmit={handleClose}
                    onSubmit={onAdd}
                    type="submit"
                    className="w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    <h1 className=" uppercase ">add</h1>
                  </button>
                </form>
              </div>
            </Dialog>
          </div>
        </>
      )}
    </>
  );
}

export default AddProject;
