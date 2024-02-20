import React from "react";
import { Link, Outlet } from "react-router-dom";

const Nav = () => {
  return (
    <div>

      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to={"/"}>home</Link>  |{" "}
        <Link to="/login">login</Link> |{" "}
      </nav>
      <Outlet/>
    </div>
  );
};

export default Nav;
