import * as React from "react";
import {
  Button,
  Stack,
  TextField,
  Divider,
  Typography,
  Container,
  FormHelperText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
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
    <Container
      sx={{
        width: 500,
        height: 500,
        paddingTop: "24px",
        border: "2px solid #0d6efd",
        borderRadius: "50px",
      }}
      alignItems={"center"}
    >
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h3" align="center" color={"primary"}>
          Login
        </Typography>
        <Divider variant="middle" />

        <TextField
          required
          fullWidth
          id="email"
          label="Email Address"
          variant="outlined"
          type="email"
          margin="normal"
          size="small"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.email && formik.errors.email && (
          <FormHelperText id="my-helper-text" error>
            {formik.errors.email}
          </FormHelperText>
        )}

        <TextField
          required
          fullWidth
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          size="small"
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <FormHelperText id="my-helper-text" error>
            {formik.errors.password}
          </FormHelperText>
        )}

        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" disabled={!formik.isValid}>
            Login
          </Button>

          <Button variant="outlined" href="/signup" to="/signup">
            Signup
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default Login;
