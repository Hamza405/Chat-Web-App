import React from "react";
import Chats from "../Chats/Chats";
import NavBar from "../NavBar/NavBar";
import Search from "../Search/Search";
import style from "./SideBarStyle.module.scss";

const SideBar = () => {
  return (
    <div className={style.sidebar}>
      <NavBar />
      <Search />
      <Chats />
    </div>
  );
};

export default SideBar;
