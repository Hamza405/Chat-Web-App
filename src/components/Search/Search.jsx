import React, { useState } from "react";
import {
  collection,
  getDocs,
  getDoc,
  startAt,
  query,
  endAt,
  orderBy,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import AuthContext from "../../store/AuthContext";
import style from "../Search/SearchStyle.module.scss";
import { useContext } from "react";

const Search = () => {
  const { userInfo } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [error, setError] = useState(false);

  const handleSearch = async () => {
    let q = query(
      collection(db, "users"),
      orderBy("name"),
      startAt(userName),
      endAt(userName + "\uf8ff")
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (userInfo.uid !== doc.data().uid) {
          setUsers((prev) => [...prev, doc.data()]);
        }
      });
    } catch (e) {
      setError(true);
    }
  };

  const handleSelect = async (user) => {
    // create a chat chats collection
    const combId =
      userInfo.uid > user.uid
        ? userInfo.uid + user.uid
        : user.uid + userInfo.uid;
    try {
      const res = await getDoc(doc(db, "chats", combId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combId), { messages: [] });

        //create user chat
        await updateDoc(doc(db, "userChats", userInfo.uid), {
          [combId + ".userInfo"]: {
            ...user,
          },
          [combId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combId + ".userInfo"]: {
            ...userInfo,
          },
          [combId + ".date"]: serverTimestamp(),
        });
      }
    } catch (e) {
      console.log(e);
    }
    setUsers([]);
    setUserName("");
  };

  const handleKey = (e) => {
    if ((userName !== "") & (users.length === 0)) {
      handleSearch();
    }
  };

  return (
    <div className={style.search}>
      <div className={style.form}>
        <input
          type="text"
          placeholder="Find a user"
          onChange={(e) => {
            setUserName(e.target.value);
            setUsers([]);
          }}
          onKeyUp={handleKey}
          value={userName}
        />
      </div>
      {error && <span>User Not Found</span>}
      {users.length > 0 &&
        users.map((u) => (
          <div
            key={u.uid}
            className={style.chat}
            onClick={() => {
              handleSelect(u);
            }}
          >
            <img src={u.photoURL} alt={u.name} />
            <div className={style.info}>
              <span>{u.name}</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Search;
