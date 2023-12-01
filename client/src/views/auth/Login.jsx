import React, { useContext } from "react";
import { Link as ReactRouterLink, Navigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { displayErrors, sweetAlertBox } from "../../utility/helpers/index";
import LoginImage from "../../assets/images/login.png"
import { ApiCall } from "../../utility/services/index"
import { AppContext } from "../../utility/context";

const Login = () => {
  const { isAuth, setIsAuth, setUserData } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handelLogin = async (data) => {
    try {
      const resp = await ApiCall("auth/login", "POST", data);
      if (resp.status === 200) {
        let data = resp?.data?.data
        setIsAuth(true);
        setUserData({ _id: data?._id, name: data?.name, email: data?.email, mobile: data?.mobile })
        localStorage.setItem("isLoggedIn", true)
        localStorage.setItem("token", data?.token)
        localStorage.setItem("user", data?.name)
        reset()
      } else {
        setUserData({})
        setIsAuth(false);
        localStorage.clear()
        sweetAlertBox(`Oops`, `${resp?.data?.message}`, "warning");
      }
    } catch (error) {
      setIsAuth(false);
      setUserData({})
      localStorage.clear()
      sweetAlertBox(`Oops`, `something went wrong`, "warning");
    }
  };
  if (isAuth) return <Navigate to="/dashboard" />;

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${LoginImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(handelLogin)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                size="small"
                autoComplete="email"
                autoFocus
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
              />
              {displayErrors("email", errors)}
              <TextField
                margin="normal"
                required
                fullWidth
                size="small"
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", { required: true })}
              />
              {displayErrors("password", errors)}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container alignItems="center" justifyContent="center">
                <Grid item>
                  <ReactRouterLink variant="body2" to="/sign-up">
                    Don't have an account? Sign Up
                  </ReactRouterLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Login
