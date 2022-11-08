import React, { useState, useContext, useEffect } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../services/firebase";
import AuthContext from "../../store/AuthContext";
import style from "./ChatsStyle.module.scss";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, "userChats", userData.localId),
        (doc) => {
          console.log(doc);
          setChats(doc.data());
        }
      );
      return () => {
        unsub();
      };
    };

    userData.localId && getChats();
  }, [userData.localId]);
  return (
    <div>
      {Object.entries(chats)?.map((chat) => {
        return (
          <div key={chat[0]} className={style.chats}>
            <img src="data:image/png;base64,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" />
            <div className={style.info}>
              <span>{chat[1].userInfo.name}</span>
              <p>Hello bebe</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chats;
