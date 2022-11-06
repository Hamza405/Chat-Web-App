import { createContext, useEffect, useState } from "react";
import { db } from "../services/firebase";
import { getDoc, doc } from "firebase/firestore";

const AuthContext = createContext({
  userData: {},
  userInfo: {},
  isAuth: false,
  handleLogin: (data) => {},
  handleLogout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [isAuth, setIsAuth] = useState(false);

  const handleLogin = async (data) => {
    const reference = doc(db, "users", data.localId);
    try {
      const userInfo = await getDoc(reference);
      setUserData(data);
      setUserInfo(userInfo.data());
      setIsAuth(true);
    } catch (e) {
      console.log(data);
      throw new Error(data.error.message || "Could not signin!.");
    }
  };

  const handleLogout = () => {
    setIsAuth(false);
    setUserData({});
    setUserInfo({});
  };

  const context = {
    userData,
    userInfo,
    isAuth,
    handleLogin,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
