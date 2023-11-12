import AllRoutes from "./routes";
import { useContext, useEffect } from "react";
import Header from "./components/Header";
import { AppContext } from "./utility/context/index";
import { Navigate } from "react-router-dom";
import { ApiCall } from "./utility/services";

const App = () => {
  const { isAuth, userData, setUserData } = useContext(AppContext);
  let urls = window.location.href.split('/')
  if (!isAuth && !["/", "", "register"].includes(urls[urls.length - 1])) {
    return <Navigate to="" />
  };
  useEffect(() => {
    if (userData === null && isAuth) {
      ApiCall("user/profile", "GET").then(({ data }) => {
        setUserData(data?.data[0])
      })
    }
  }, [userData])

  return (
    <>
      {isAuth && <Header />}
      <AllRoutes />
    </>
  )
};
export default App;
