import Login from "../views/auth/Login";
import Registration from "../views/auth/Registration";
import Dashboard from "../views/Dashboard";
import Profile from "../views/user/Profile";
import { Route, Routes } from "react-router-dom";

const router = () => {
  return (
    <Routes>
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route exact path="/sign-up" element={<Registration />} />
    </Routes >
  );
};

export default router;
