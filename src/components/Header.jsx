import React from "react";
import logo from "../assets/coologo.png";

function Header() {
  return (
    <nav className=" flex items-center justify-center gap-x-5">
      <img src={logo} className="h-16 w-16 rounded-full" />
      <h1 className=" uppercase font-bold tracking-widest  ">
        project management tool
      </h1>
    </nav>
  );
}

export default Header;
