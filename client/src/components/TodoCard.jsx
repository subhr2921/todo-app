import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Edit from "@mui/icons-material/Edit";
import Check from "@mui/icons-material/Check";
import Delete from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";
import CheckCircle from "@mui/icons-material/CheckCircle"

const TodoCard = ({ data, handelAction }) => {
  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {data?.title}
          </Typography>
          <Typography>
            {data?.description}
          </Typography>
        </CardContent>
        {
          !data?.isDone ? <CardActions sx={{
            alignSelf: "center",
            display: "flex",
          }}>
            <Button size="small" title="Edit Task" onClick={() => handelAction('EDIT', data)}>
              <Avatar sx={{ m: 0, bgcolor: "secondary.main" }}>
                <Edit />
              </Avatar>
            </Button>
            <Button size="small" title="Mark Complete" onClick={() => handelAction('COMPLETE', data)}>
              <Avatar sx={{ m: 0, bgcolor: "success.main" }}>
                <Check />
              </Avatar>
            </Button>
            <Button size="small" title="Delete task" onClick={() => handelAction('DELETE', data)}>
              <Avatar sx={{ m: 0, bgcolor: "danger.main" }}>
                <Delete />
              </Avatar>
            </Button>
          </CardActions> : <Chip label="TASK DONE" color="success" sx={{ m: 2 }} icon={<CheckCircle />} />
        }
      </Card>
    </>
  );
};

export default TodoCard