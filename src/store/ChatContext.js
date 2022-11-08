import { useContext, useReducer } from "react";
import AuthContext from "./AuthContext";

const { createContext } = require("react");

const INIT_STATE = {
  chatId: "null",
  user: {},
};

const ChatContext = createContext(INIT_STATE);

export const ChatContextProvider = ({ children }) => {
  const { userInfo } = useContext(AuthContext);
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            userInfo.uid > action.payload.uid
              ? userInfo.uid + action.payload.uid
              : action.payload.uid + userInfo.uid,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(chatReducer, INIT_STATE);

  const context = {
    data: state,
    dispatch,
  };
  return (
    <ChatContext.Provider value={context}>{children}</ChatContext.Provider>
  );
};
export default ChatContext;
