import "../Styles/TodoStyle.css";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { taskHandler, useTaskState } from "../Controller/TodoListController";
import React from "react";

interface InitialTaskValues {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const controller = taskHandler(useTaskState());
  const navigate = useNavigate();
  const initialValues: InitialTaskValues = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const userValidation = yup.object().shape({
    userName: yup
      .string()
      .required("Name is a required field")
      .min(3, "Name must be at least 3 characters"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is a required field"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).*$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password"), ""], 'Must match "password" field value'),
  });

  const onSubmit = async (values: InitialTaskValues) => {
    try {
      const res = await controller.signup(values);
      if (res) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error signup in:", error);
    }
  };

  const formik = useFormik({
    initialValues,

    validationSchema: userValidation,
    onSubmit,
  });

  return (
    <>
      <div className="container inner" style={{ marginTop: "30px" }}>
        <form onSubmit={formik.handleSubmit}>
          <h1>Signup</h1>
          <hr />
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="userName"
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.userName && formik.errors.userName && (
              <div className="error text-danger">{formik.errors.userName}</div>
            )}
          </div>
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
              <div className="error text-danger">{formik.errors.email}</div>
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
              <div className="error text-danger ">{formik.errors.password}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="error text-danger">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!formik.isValid}
          >
            Signup
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
