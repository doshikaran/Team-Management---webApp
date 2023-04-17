import React from "react";
import { FaTrash } from "react-icons/fa";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { DELETEMEMBER } from "../Mutations/memberMutation";
import { useMutation } from "@apollo/client";
import { GETMEMBERS } from "../queries/queryMember";

function MemberRow({ member }) {
  const [deletemember] = useMutation(DELETEMEMBER, {
    variables: { id: member.id },
    refetchQueries: [{ query: GETMEMBERS }],
  });

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell align="right">{member.name}</TableCell>
      <TableCell align="right">{member.email}</TableCell>
      <TableCell align="right">{member.phone}</TableCell>
      <TableCell align="right">
        <button
          onClick={deletemember}
          className=" p-2 hover:bg-gray-100 hover:rounded-full"
        >
          <FaTrash />
        </button>
      </TableCell>
    </TableRow>
  );
}

export default MemberRow;
