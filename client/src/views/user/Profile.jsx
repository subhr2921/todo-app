import React, { useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { displayErrors, sweetAlertBox } from "../../utility/helpers";
import { ApiCall } from "../../utility/services";
import { AppContext } from "../../utility/context";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CardMedia from "@mui/material/CardMedia";
import avatar1 from "../../assets/images/1.jpg"
import { Chip, Divider, Typography } from "@mui/material";

const Profile = () => {
    const { userData, handelUserData } = useContext(AppContext);
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

    useEffect(() => {
        if (userData === null)
            handelUserData()
        else
            reset({
                name: userData?.name,
                mobile: userData?.mobile,
            })
    }, [userData])

    const handelFormSubmit = async (data) => {
        try {
            data.userId = userData?._id
            const resp = await ApiCall("user/update", "POST", data);
            if (resp.status === 200) {
                localStorage.setItem("user", data?.name)
                reset()
                handelUserData()
                sweetAlertBox(`Success`, `User Updated Successfully`, "success");
            } else {
                localStorage.clear()
                sweetAlertBox(`Oops`, `${resp?.data?.message}`, "warning");
            }
        } catch (error) {
            localStorage.clear()
            sweetAlertBox(`Oops`, `something went wrong`, "warning");
        }
    };

    return (
        <>
            <Grid container component="main" sx={{ height: "88vh", p: 1 }}>
                <Grid item xs={12} sm={12} md={4}>
                    <Card
                        sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            boxShadow: 3,
                            alignItems: "center",
                            justify: "center",
                            p: 2
                        }}
                    >
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            sx={{
                                height: 150,
                                width: 150,
                                borderRadius: 50
                            }}
                            image={avatar1}
                        />
                        <Typography gutterBottom variant="h5" component="div">
                            {userData?.name}
                        </Typography>
                        <CardContent sx={{ flexGrow: 1, width: 1 }}>
                            <Divider textAlign="center" sx={{ width: 1 }}>
                                <Chip label="PROFILE SUMMARY" />
                            </Divider>
                            {
                                userData !== null && <List>
                                    <ListItem sx={{ p: 0 }}>
                                        <Typography>
                                            Name :
                                        </Typography>
                                        <ListItemText sx={{ ml: 1 }} secondary={`${userData?.name}`} />
                                    </ListItem>
                                    <ListItem sx={{ p: 0 }}>
                                        <Typography>
                                            Email :
                                        </Typography>
                                        <ListItemText sx={{ ml: 1 }} secondary={`${userData?.email}`} />
                                    </ListItem>
                                    <ListItem sx={{ p: 0 }}>
                                        <Typography>
                                            Mobile :
                                        </Typography>
                                        <ListItemText sx={{ ml: 1 }} secondary={`${userData?.mobile}`} />
                                    </ListItem>
                                    <ListItem sx={{ p: 0 }}>
                                        <Typography>
                                            Task Created :
                                        </Typography>
                                        <ListItemText sx={{ ml: 1 }} secondary={`${userData?.task?.length}`} />
                                    </ListItem>
                                    <ListItem sx={{ p: 0 }}>
                                        <Typography>
                                            Task Completed  :
                                        </Typography>
                                        <ListItemText sx={{ ml: 1 }} secondary={`${userData?.task?.filter((e) => e?.isDone === true).length}`} />
                                    </ListItem>
                                </List>
                            }
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                    <Card
                        sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            boxShadow: 3,
                            ml: 1,
                            p: 4
                        }}
                        component="form"
                        noValidate
                        onSubmit={handleSubmit(handelFormSubmit)}
                    >
                        <Grid container alignItems="center" justifyContent="center" columnSpacing={3}>
                            <Grid item xs={12} sm={12} md={4}>
                                <FormLabel>Full Name</FormLabel>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    name="name"
                                    type="text"
                                    sx={{ mt: 0.5, mb: 0.25 }}
                                    autoComplete="name"
                                    autoFocus
                                    size="small"
                                    {...register("name", { required: true })}
                                />
                                {displayErrors("name", errors)}
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} mt={2}>
                                <FormLabel>Mobile Number</FormLabel>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8} mt={2}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="mobile"
                                    type="text"
                                    size="small"
                                    sx={{ mt: 0.5, mb: 0.25 }}
                                    autoComplete="mobile"
                                    {...register("mobile", {
                                        required: true, pattern: {
                                            value: /^[6-9]\d{9}$/,
                                            message: "Invalid mobile number",
                                        },
                                    })}
                                />
                                {displayErrors("mobile", errors)}
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} mt={6}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Save Changes
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid >
        </>
    );
}

export default Profile