import React, { useState, useEffect } from "react";
import "../Styles/TodoStyle.css";
import TodoTask from "./TodoTask";
import { taskHandler, useTaskState } from "../Controller/TodoListController";

interface InitialTaskValues {
  _id: string;
  task: string;
  editing: boolean;
}

const TodoList: React.FC = () => {
  const initialValues: InitialTaskValues = {
    _id: "",
    task: "",
    editing: false,
  };
  const todoListController = taskHandler(useTaskState());
  const todoListArray: InitialTaskValues[] = [];
  const [todoList, setTodoList] = useState(todoListArray);
  const [task, setTask] = useState(initialValues);
  const fetchTodoList = async () => {
    try {
      const fetchedTasks = await todoListController.getTasks();
      setTodoList(fetchedTasks);
    } catch (error) {
      console.log("Error in fetching tasks", error);
    }
  };
  useEffect(() => {
    fetchTodoList();
  }, []);

  const handleRemoveTask = async (taskId: string) => {
    try {
      await todoListController.removeTask(taskId);
      fetchTodoList();
    } catch (error) {
      console.error("Error removing task:", error);
    }
  };

  const handleEditTask = async (newTask: InitialTaskValues) => {
    try {
      await todoListController.updateTask(newTask);
      setTask(initialValues);
      fetchTodoList();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleUpdateTask = async (newTask: InitialTaskValues) => {
    try {
      const taskExists = todoList.some(
        (prevTask) => prevTask.task.toLowerCase() === newTask.task.toLowerCase()
      );

      if (taskExists) {
        alert("Task already exists in todo list");
      } else {
        handleEditTask(newTask);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleKeyDown = async (event: any) => {
    if (event.key === "Enter" && task.task.trim() !== "") {
      const taskExists = todoList.some(
        (prevTask) => prevTask.task.toLowerCase() === task.task.toLowerCase()
      );
      if (taskExists) {
        alert("Task already exists in todo list");
      } else {
        await todoListController.addTask(task);
        setTask(initialValues);
        fetchTodoList();
      }
    }
  };

  const onChange = (event: any) => {
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
                editTask={handleEditTask}
                updateTask={handleUpdateTask}
                removeTask={handleRemoveTask}
              ></TodoTask>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TodoList;
