import React from "react";
import Cam from "../../assets/images/cam.png";
import Add from "../../assets/images/add.png";
import More from "../../assets/images/more.png";
import style from "./ChatStyle.module.scss";

const Chat = () => {
  return (
    <div className={style.chat}>
      <div className={style.chatInfo}>
        <span>Hamza</span>
        <div className={style.chatInfos}>
          <img src={Cam} alt="chatInfo" />
          <img src={Add} alt="chatInfo" />
          <img src={More} alt="chatInfo" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
