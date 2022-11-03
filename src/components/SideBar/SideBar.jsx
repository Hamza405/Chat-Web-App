import React from "react";
import NavBar from "../NavBar/NavBar";
import Search from "../Search/Search";
import style from "./SideBarStyle.module.scss";

const SideBar = () => {
  return (
    <div className={style.sidebar}>
      <NavBar />
      <Search />
    </div>
  );
};

export default SideBar;
