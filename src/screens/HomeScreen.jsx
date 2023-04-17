import React from "react";
import AddMember from "../components/AddMember";
import AddProject from "../components/AddProject";
import Members from "../components/Members";
import Projects from "../components/Projects";

function HomeScreen() {
  return (
    <div>
      <AddMember />
      <Members />
      <AddProject/>
      <Projects />
    </div>
  );
}

export default HomeScreen;
