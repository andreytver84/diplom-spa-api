import { createContext, useContext, useState } from "react";
import React from "react";

const StateContext = createContext({
  token: null,
  setToken: () => {},
  halls: null,
  setHalls: () => {},
  sessionsDataCtx: [],
  setSessionsDataCtx: () => {},
  hallConfCtx: [],
  setHallConfCtx: () => {},
});

export const ContextProvider = ({ children }) => {
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [halls, setHalls] = useState([]);
  const [sessionsDataCtx, setSessionsDataCtx] = useState([]);
  const [hallConfCtx, setHallConfCtx] = useState([]);

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <StateContext.Provider
      value={{
        token,
        setToken,
        halls,
        setHalls,
        sessionsDataCtx,
        setSessionsDataCtx,
        hallConfCtx,
        setHallConfCtx,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
