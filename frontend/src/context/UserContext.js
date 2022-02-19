import { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  //Global state for user
  const state = {
    user,
  };

  return (
    <UserContext.Provider
      value={{
        state,
        //global functions for user
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
