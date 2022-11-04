import React from "react";
import Message from "../Message/Message";
import style from "./MessagesStyle.module.scss";

const Messages = () => {
  return (
    <div className={style.messages}>
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
};

export default Messages;
