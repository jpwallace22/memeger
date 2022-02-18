import { createContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [sortBy, setSortBy] = useState("p.date");

  const state = {
    date,
    sortBy,
  };

  const value = {
    state,
    setDate,
    setSortBy,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContext;
