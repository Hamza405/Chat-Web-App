import React from "react";
import ChatContext from "../../store/ChatContext";
import Cam from "../../assets/images/cam.png";
import Add from "../../assets/images/add.png";
import More from "../../assets/images/more.png";
import style from "./ChatStyle.module.scss";
import Messages from "../Messages/Messages";
import Input from "../Input/Input";
import { useContext } from "react";

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className={style.chat}>
      <div className={style.chatInfo}>
        <span>{data.user.name}</span>
        <div className={style.chatInfos}>
          <img src={Cam} alt="chatInfo" />
          <img src={Add} alt="chatInfo" />
          <img src={More} alt="chatInfo" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
