import { useState, createContext } from "react";
import { ApiCall } from "../services";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isLoggedIn") || false);
  const [userData, setUserData] = useState(null);

  const handelUserData = async () => {
    let respData = await ApiCall("user/profile", "GET")
    setUserData(respData?.data?.data[0])
  }

  const values = {
    isAuth,
    setIsAuth,
    setUserData,
    userData,
    handelUserData
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export { AppContextProvider, AppContext };
