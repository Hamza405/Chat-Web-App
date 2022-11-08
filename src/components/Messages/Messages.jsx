import React, { useContext, useState, useEffect } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../services/firebase";
import ChatContext from "../../store/ChatContext";
import Message from "../Message/Message";
import style from "./MessagesStyle.module.scss";

const Messages = () => {
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);
  console.log(messages);
  return (
    <div className={style.messages}>
      {messages.map((m) => (
        <Message message={m} />
      ))}
    </div>
  );
};

export default Messages;
