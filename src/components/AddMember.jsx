import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { useMutation } from "@apollo/client";
import { ADDMEMBER } from "../Mutations/memberMutation";
import { GETMEMBERS } from "../queries/queryMember";

function AddMember() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [AddnewMember] = useMutation(ADDMEMBER, {
    variables: { name, email, phone },
    update(cache, { data: { addMember } }) {
      const { members } = cache.readQuery({
        query: GETMEMBERS,
      });
      cache.writeQuery({
        query: GETMEMBERS,
        data: { members: [...members, AddnewMember] },
      });
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onAdd = (error) => {
    error.preventDefault();
    if (name === "" || email === "" || phone === "") {
      return alert("Please enter everything");
    }
    AddnewMember(name, email, phone);
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
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
            add a member
          </span>
        </div>
      </a>

      <Dialog open={open} onClose={handleClose}>
        <div class="px-6 py-6 lg:px-8">
          <h3 className="mb-4 text-2xl uppercase tracking-widest font-medium text-gray-900">
            add a new member
          </h3>
          <form onSubmit={onAdd} className="space-y-6">
            <div>
              <label
                for="name"
                class="block uppercase mb-2 text-xs font-medium text-gray-900"
              >
                Enter your name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder=""
                required
              />
            </div>
            <div>
              <label
                for="name"
                className="block uppercase mb-2 text-xs font-medium text-gray-900"
              >
                Enter your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                // value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder=""
                required
              />
            </div>
            <div>
              <label
                for="name"
                className="block uppercase mb-2 text-xs font-medium text-gray-900"
              >
                Enter your contact number
              </label>
              <input
                type="text"
                name="number"
                id="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder=""
                required
              />
            </div>
            <button
              onSubmit={handleClose}
              // onSubmit={onAdd}
              type="submit"
              className="w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              <h1 className=" uppercase ">add</h1>
            </button>
          </form>
        </div>
      </Dialog>
    </div>
  );
}

export default AddMember;
