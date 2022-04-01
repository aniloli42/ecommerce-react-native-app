import { createContext, useContext } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export default ({ children }) => {
  return (
    <UserContext.Provider value={{ name: 1 }}>{children}</UserContext.Provider>
  );
};
