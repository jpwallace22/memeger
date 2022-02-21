import { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  //GLOBAL STATE AND FUNCTIONS FOR ALL USERS
  const userState = {
    user,
    setUser,
    userLogin,
    userLogout,
  };

  //---------FUNCTIONS------------//

  async function userLogin(input) {
    try {
      const response = await fetch(`/api/users/login.php`, {
        method: "POST",
        body: JSON.stringify(input),
      });
      const userInfo = await response.json();
      return userInfo;
    } catch (error) {
      throw new Error(error);
    }
  }

  async function userLogout() {
    try {
      const res = await fetch("/api/users/logout.php");
      const data = await res.json();
      if (data) {
        console.warn("session killed");
      }
      data && console.log("test");
    } catch (e) {
      throw new Error(e);
    }
  }

  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
};

export default UserContext;
