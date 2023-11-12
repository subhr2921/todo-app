import AllRoutes from "./routes";
import { useContext, useEffect } from "react";
import Header from "./components/Header";
import { AppContext } from "./utility/context/index";
import { useNavigate, useLocation } from "react-router-dom";
import { ApiCall } from "./utility/services";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuth, userData, setUserData } = useContext(AppContext);
  let tokenValue = localStorage.getItem('token');
  let beforeLoginUrls = ['/', '/register'];
  useEffect(() => {
    let isTokenExpired = false;
    ApiCall('auth/verify-token', 'POST').then((resp) => {
      isTokenExpired = resp?.status === 403
    })
    if (((tokenValue === null || isAuth === false) && !beforeLoginUrls.includes(location.pathname)) || isTokenExpired) {
      return navigate('/');
    }
  }, [tokenValue, location.pathname]);

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
