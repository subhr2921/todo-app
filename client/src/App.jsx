import AllRoutes from "./routes";
import { useContext, useEffect } from "react";
import Header from "./components/Header";
import { AppContext } from "./utility/context/index";
import { useNavigate, useLocation } from "react-router-dom";
import { ApiCall } from "./utility/services";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuth, userData, setUserData, setIsAuth } = useContext(AppContext);
  let tokenValue = localStorage.getItem('token') || null;
  let beforeLoginUrls = ['/', '/sign-up'];
  useEffect(() => {
    if (tokenValue !== null) {
      ApiCall('auth/verify-token', 'POST').then((resp) => {
        if (resp.status === 403) {
          setIsAuth(false);
          localStorage.clear()
        }
      })
    }
    if ((tokenValue === null || isAuth === false) && !beforeLoginUrls.includes(location.pathname)) {
      return navigate('/');
    }
  }, [isAuth, tokenValue, location.pathname]);

  useEffect(() => {
    if (userData === null && isAuth) {
      ApiCall("user/profile", "GET").then((resp) => {
        if (resp.status === 200) {
          setUserData(resp?.data?.data[0])
        }
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
