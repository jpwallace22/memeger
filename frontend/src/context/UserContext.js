import { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const state = {
    user,
  };

  return (
    <UserContext.Provider
      value={{
        state,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
