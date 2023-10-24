import React from "react";
import "../Styles/TodoStyle.css";
import { ListItem, Checkbox, FormControlLabel, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
function TodoTask(props) {
  return (
    <ListItem>
      {props.task.editing ? (
        <TextField
          variant="outlined"
          label={props.task.task}
          id="task"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              props.updateTask({
                ...props.task,
                task: e.target.value,
                editing: !props.task.editing,
              });
            }
          }}
        />
      ) : (
        <FormControlLabel control={<Checkbox />} label={props.task.task} />
      )}
      <IconButton
        aria-label="Edit"
        onClick={() =>
          props.editTask({ ...props.task, editing: !props.task.editing })
        }
      >
        <EditIcon />
      </IconButton>
      <IconButton
        aria-label="Delete"
        onClick={() => {
          props.removeTask(props.task._id);
        }}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}

export default TodoTask;
