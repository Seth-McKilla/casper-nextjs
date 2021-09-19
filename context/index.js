import * as React from "react";
import { user } from "./reducers/user";
import Cookies from "js-cookie";

const initialState = {
  user: Cookies.get("casper_pub_key") ? Cookies.get("casper_pub_key") : "",
};

const Context = React.createContext({});

const combineReducers =
  (...reducers) =>
  (state, action) => {
    for (let i = 0; i < reducers.length; i++)
      state = reducers[i](state, action);
    return state;
  };

// context provider
const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    combineReducers(user),
    initialState
  );
  const value = { state, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
