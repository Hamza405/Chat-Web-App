import React, { useState } from "react";
import {
  collection,
  getDocs,
  startAt,
  query,
  endAt,
  orderBy,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import style from "../Search/SearchStyle.module.scss";

const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState([]);
  const [error, setError] = useState(false);

  const handleSearch = async () => {
    let s = query(
      collection(db, "users"),
      orderBy("name"),
      startAt(userName),
      endAt(userName + "\uf8ff")
    );
    try {
      const querySnapshot = await getDocs(s);
      querySnapshot.forEach((doc) => {
        setUser((prev) => [...prev, doc.data()]);
      });
    } catch (e) {
      setError(true);
    }
  };

  const handleKey = (e) => {
    if ((userName !== "") & (user.length === 0)) {
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
            setUser([]);
          }}
          onKeyUp={handleKey}
        />
      </div>
      {error && <span>User Not Found</span>}
      {user.length > 0 &&
        user.map((u) => (
          <div key={u.uid} className={style.chat}>
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
