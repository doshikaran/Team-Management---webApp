import { useQuery } from "@apollo/client";
import React from "react";
import { GETMEMBERS } from "../queries/queryMember";
import MemberRow from "./MemberRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Members() {
  const { loading, error, data } = useQuery(GETMEMBERS);

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
    <div>
      {!loading && !error && (
        <Paper sx={{ maxWidth: 700 }}>
          <TableContainer className=" mt-10">
            <Table sx={{ maxWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">NAME</TableCell>
                  <TableCell align="right">EMAIL</TableCell>
                  <TableCell align="right">PHONE</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.members.map((member) => (
                  <MemberRow key={member.id} member={member} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </div>
  );
}

export default Members;
