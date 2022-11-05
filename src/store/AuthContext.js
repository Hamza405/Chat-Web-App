import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
  userData: {},
  userInfo: {},
  isAuth: false,
  handleLogin: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [isAuth, setIsAuth] = useState(false);

  const handleLogin = (data) => {
    setUserData(data);
    setIsAuth(true);
  };

  // useEffect(() => {
  //   const sub = onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //     console.log(user);
  //   });
  //   return () => {
  //     sub();
  //   };
  // }, []);

  const context = {
    userData,
    userInfo,
    isAuth,
    handleLogin,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
