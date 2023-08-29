import React, { useState, useEffect } from "react";
import "../Styles/TodoStyle.css";
import TodoTask from "./TodoTask";
import { taskHandler, useTaskState } from "../Controller/TodoListController";

function TodoList() {
  const initialTaskValues = {
    task: "",
    editing: false,
  };
  const todoListController = taskHandler(useTaskState());
  const [todoList, setTodoList] = useState([]);
  const [task, setTask] = useState(initialTaskValues);

  useEffect(() => {
    const fetchTodoList = async () => {
      const fetchedTasks = await todoListController.getTasks();
      setTodoList(fetchedTasks);
    };
    fetchTodoList();
  }, [todoListController]);

  const handleRemoveTask = async (taskId) => {
    try {
      await todoListController.removeTask(taskId);
    } catch (error) {
      console.error("Error removing task:", error);
    }
  };

  const handleUpdateTask = async (newTask) => {
    try {
      await todoListController.updateTask(newTask);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter" && task.task.trim() !== "") {
      const taskExists = todoList.some(
        (prevTask) => prevTask.task === task.task
      );
      if (taskExists) {
        alert("Task already exists in todo list");
      } else {
        await todoListController.addTask(task);
        setTask(initialTaskValues);
      }
    }
  };

  const onChange = (event) => {
    setTask({ ...task, task: event.target.value });
  };

  return (
    <>
      <div className="outer">
        <div className="container inner ">
          <h1>My Todo</h1>
          <input
            className="addItems"
            type="text"
            name="task"
            value={task.task}
            id="item"
            placeholder="Input task name and then tab enter to add"
            onKeyDown={handleKeyDown}
            onChange={onChange}
          />

          <hr />
          <ul>
            {todoList.map((task) => (
              <TodoTask
                key={task._id}
                task={task}
                updateTask={handleUpdateTask}
                removeTask={handleRemoveTask}
              ></TodoTask>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default TodoList;
