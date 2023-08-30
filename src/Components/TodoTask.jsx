import React from "react";
import "../Styles/TodoStyle.css";

function TodoTask(props) {
  return (
    <li>
      {props.task.editing ? (
        <input
          type="text"
          defaultValue={props.task.task}
          name="task"
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
        <>
          <input
            type="checkbox"
            defaultChecked={props.task.editing}
            id="checkboxInput"
          />
          <span>{props.task.task}</span>
        </>
      )}

      <i
        className="fa fa-pencil-square-o edit"
        aria-hidden="true"
        onClick={() =>
          props.editTask({ ...props.task, editing: !props.task.editing })
        }
      ></i>
      <i
        className="fa fa-trash del"
        aria-hidden="true"
        onClick={() => {
          props.removeTask(props.task._id);
        }}
      ></i>
    </li>
  );
}

export default TodoTask;
