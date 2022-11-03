import React from "react";
import NavBar from "../NavBar/NavBar";
import style from "./SideBarStyle.module.scss";

const SideBar = () => {
  return (
    <div className={style.sidebar}>
      <NavBar />
    </div>
  );
};

export default SideBar;
