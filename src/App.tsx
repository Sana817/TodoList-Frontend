import React from "react";
import TodoList from "./Components/TodoList";
import "../src/Styles/TodoStyle.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/todoList" element={<TodoList />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
