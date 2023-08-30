import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { taskHandler, useTaskState } from "../Controller/TodoListController";

const Login = () => {
  const controller = taskHandler(useTaskState());
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const userValidation = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is a required field"),
    password: yup
      .string()
      .required("Please enter your password")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
  });

  const onSubmit = async (values) => {
    try {
      const res = await controller.login(values);
      if (res) {
        localStorage.setItem("user-authentication", res);
        navigate("/todoList");
      } else {
        alert("You have no account please signup first");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: userValidation,
    onSubmit,
  });

  return (
    <div className="container inner" style={{ marginTop: "30px" }}>
      <form onSubmit={formik.handleSubmit}>
        <h1>Login</h1>
        <hr />
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-danger">{formik.errors.email}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-danger">{formik.errors.password}</div>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!formik.isValid}
        >
          Login
        </button>

        <NavLink
          className="btn btn-primary"
          style={{ marginLeft: "10px" }}
          to="/signup"
        >
          Signup
        </NavLink>
      </form>
    </div>
  );
};

export default Login;
