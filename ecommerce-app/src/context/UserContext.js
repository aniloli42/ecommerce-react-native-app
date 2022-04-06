import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

export default ({ children }) => {
  // User State Management
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [temp, setTemp] = useState(null);

  useEffect(() => {
    if (user == null) return setIsLogged(false);

    setIsLogged(true);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, isLogged, temp, setTemp }}>
      {children}
    </UserContext.Provider>
  );
};
