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
    getProfileInfo,
  };

  if (!userState.user.user_id && localStorage.getItem("loggedUser") != null) {
    setUser(JSON.parse(localStorage.getItem("loggedUser")));
  }

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
      data && console.warn("Session killed");
    } catch (e) {
      throw new Error(e);
    }
  }

  async function getProfileInfo(JSONusername) {
    try {
      const res = await fetch("/api/users/user.php", {
        method: "POST",
        body: JSON.stringify(JSONusername),
      });
      const data = await res.json();
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
};

export default UserContext;
