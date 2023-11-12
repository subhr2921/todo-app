import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { displayErrors, sweetAlertBox } from "../../utility/helpers";
import { Link as ReactRouterLink, Navigate } from "react-router-dom";
import SignUpImage from "../../assets/images/signup.webp"
import { ApiCall } from "../../utility/services";
import { AppContext } from "../../utility/context";

const Registration = () => {
  const { isAuth, setIsAuth } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      mobile: "",
    },
  });

  const handelFormSubmit = async (data) => {
    try {
      const resp = await ApiCall("user/register", "POST", data);
      if (resp.status === 200) {
        let data = resp?.data?.data
        setIsAuth(true)
        setUserData(resp?.data?.data)
        setUserData({ _id: data?._id, name: data?.name, email: data?.email, mobile: data?.mobile })
        localStorage.setItem("isLoggedIn", true)
        localStorage.setItem("token", data?.token)
        localStorage.setItem("user", data?.name)
        reset()
        sweetAlertBox(`Success`, `User Created Successfully`, "success");
      } else {
        setIsAuth(false);
        setUserData({})
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
            backgroundImage: `url(${SignUpImage})`,
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
              my: 4.4,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 0, bgcolor: "secondary.main" }}>
              <PersonAdd />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 0 }}
              onSubmit={handleSubmit(handelFormSubmit)}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="full name"
                name="name"
                type="text"
                autoComplete="name"
                autoFocus
                size="small"
                {...register("name", { required: true })}
              />
              {displayErrors("name", errors)}
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                size="small"
                type="email"
                autoComplete="email"
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
                label="mobile number"
                name="mobile"
                type="text"
                size="small"
                autoComplete="mobile"
                {...register("mobile", {
                  required: true, pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "Invalid mobile number",
                  },
                })}
              />
              {displayErrors("mobile", errors)}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                size="small"
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
                Register
              </Button>
              <Grid container alignItems="center" justifyContent="center">
                <Grid item>
                  <ReactRouterLink variant="body2" to="/">
                    Have an account? Sign In
                  </ReactRouterLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid >
    </>
  );
}

export default Registration