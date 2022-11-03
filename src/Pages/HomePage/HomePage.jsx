import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import Chat from "../../components/Chat/Chat";
import style from "./HomeStyle.module.scss";

const HomePage = () => {
  return (
    <div className={style.home}>
      <div className={style.container}>
        <SideBar />
        <Chat />
      </div>
    </div>
  );
};

export default HomePage;
