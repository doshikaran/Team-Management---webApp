import React from "react";

function MemberDetails({ member }) {
  return (
    <div className=" mt-20">
      <h1 className=" text-center text-sm font-semibold uppercase tracking-widest">
        project member/s
      </h1>
      <div className=" flex items-center justify-between mt-2 lg:flex-row md:flex-col md:gap-y-3 sm:flex-col sm:gap-y-3" >
        <h1 className=" text-sm font-light tracking-widest">{member.name}</h1>
        <h1 className=" text-sm font-light tracking-widest">{member.email}</h1>
        <h1 className=" text-sm font-light tracking-widest">{member.phone}</h1>
      </div>
    </div>
  );
}

export default MemberDetails;
