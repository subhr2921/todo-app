import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TodoCard from "../components/TodoCard";
import Container from "@mui/material/Container";
import { Avatar, TextField, FormLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import Add from "@mui/icons-material/Add";
import { displayErrors, sweetAlertBox } from "../utility/helpers";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import React, { useState, useContext, useEffect, useReducer } from "react";
import { ApiCall } from "./../utility/services/index"
import { AppContext } from "./../utility/context"
import Edit from "@mui/icons-material/Edit";
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
const MySwal = withReactContent(Swal)

const Dashboard = () => {
  const { userData } = useContext(AppContext)
  const [todoList, setTodoList] = useState([])
  const [activeTask, setActiveTask] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    getTaskList()
  }, [userData])

  const getTaskList = async () => {
    let respData = await ApiCall('task/list', 'GET')
    setTodoList(respData?.data?.data)
  }

  const handelEditTask = async (data, type = null) => {
    try {
      if (type === 'DELETE') {
        return MySwal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
          if (result.isConfirmed) {
            const resp = await ApiCall(`task/delete/${data?._id}`, "POST", data);
            if (resp.status === 200) {
              getTaskList()
              sweetAlertBox(`Success`, `Task Deleted Successfully`, "success");
            } else {
              sweetAlertBox(`Oops`, `${resp?.data?.message}`, "warning");
            }
          } else {
            MySwal.fire({
              title: "Cancelled!",
              text: "Your action not performed :)",
              icon: "error"
            });
          }
        });
      } else {
        const resp = await ApiCall("task/complete", "POST", data);
        if (activeTask) setActiveTask(null)
        if (resp.status === 200) {
          getTaskList()
          sweetAlertBox(`Success`, `Changes Done Successfully`, "success");
        } else {
          sweetAlertBox(`Oops`, `${resp?.data?.message}`, "warning");
        }
      }
    } catch (error) {
      sweetAlertBox(`Oops`, `something went wrong`, "warning");
    }
  }

  const handelAction = async (type, todoData) => {
    switch (type) {
      case "COMPLETE":
        return await handelEditTask({ _id: todoData?._id, isDone: !todoData?.isDone });
      case "EDIT":
        setActiveTask(todoData)
        return reset({
          title: todoData?.title,
          description: todoData?.description,
        })
      case "DELETE":
        return await handelEditTask({ _id: todoData?._id, isDone: !todoData?.isDone }, 'DELETE');
      default:
        return {};
    }
  }

  const handelCreateTodo = async (data) => {
    try {
      activeTask !== null && (data.taskId = activeTask['_id'])
      let resp = await ApiCall("task/create", "POST", data);
      if (resp.status === 200) {
        getTaskList()
        setActiveTask(null)
        reset()
        sweetAlertBox(`Success`, `${resp?.data?.message}`, "success");
      } else {
        sweetAlertBox(`Oops`, `${resp?.data?.message}`, "warning");
      }
    } catch (error) {
      sweetAlertBox(`Oops`, `Something went wrong`, "warning");
    }
  };

  return (
    <>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 2,
          }}
        >
          <Container maxWidth="lg">
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(handelCreateTodo)}
            >
              <Grid container
                alignItems="center"
                justify="center"
                columnSpacing={3} columns={15}
              >
                <Grid item md={7} xs={15}>
                  <FormLabel>Task Title</FormLabel>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="title"
                    type="text"
                    size="small"
                    autoFocus
                    {...register("title", { required: true })}
                  />
                  {displayErrors('title', errors)}
                </Grid>
                <Grid item md={7} xs={15}>
                  <FormLabel>Task Description</FormLabel>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="description"
                    type="textarea"
                    size="small"
                    {...register("description", { required: true })}
                  />
                  {displayErrors('description', errors)}
                </Grid>
                <Grid item md={1} xs={15} display="flex"
                  justifyContent="center">
                  <Button
                    type="submit"
                    size="small"
                  >
                    <Avatar sx={{ m: 0, mt: 4, bgcolor: "secondary.main" }}>
                      {
                        activeTask ? <Edit /> : <Add />
                      }
                    </Avatar>
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Divider textAlign="center" sx={{ mt: 3 }}><Chip label="TODO LIST" /></Divider>
          </Container>
          <Container sx={{ py: 2 }} maxWidth="lg">
            <Grid container spacing={2}>
              {todoList?.map((task) => (
                <Grid item key={task?._id} xs={12} sm={6} md={4}>
                  <TodoCard data={task} handelAction={handelAction} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </main >
    </>
  );
}

export default Dashboard
