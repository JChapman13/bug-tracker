import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

const theme = createTheme();

const numRegex = new RegExp("^(?=.*[0-9])");
const letterRegex = new RegExp("^(?=.*[a-z])|(?=.*[A-Z])");
const emailRegex = new RegExp(
  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
);

export default function SignUp(props) {
  const [user, setUser] = useState({
    password: "",
    confirm: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  // const [checks, setChecks] = useState({
  //   passwordCharacter: false,
  //   passwordNum: false,
  //   passwordLetter: false,
  //   passwordconfirm: false,
  //   firstNameCharacter: false,
  //   lastNameCharacter: false,
  //   emailValid: false,
  //   userNameInput: true,
  //   passwordInput: true,
  //   confirmInput: true,
  //   firstNameInput: true,
  //   lastNameInput: true,
  //   emailInput: true,
  // });

  const handleChange = async (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // runChecks(e);
  };

  // const runChecks = (field) => {
  // if (field.target.name === "password") {
  //   return isPasswordValid(field.target.value);
  // }
  // if (field.target.name === "confirm")
  //   return isPasswordMatch(field.target.value);
  // if (field.target.name === "firstName")
  //   return isfirstNameValid(field.target.value);
  // if (field.target.name === "lastName")
  //   return islastNameValid(field.target.value);
  // if (field.target.name === "email") return isEmailValid(field.target.value);
  // };

  // const isPasswordValid = () => {
  //   console.log(user.password.length);
  //   if (user.password.length + 1 >= 8) {
  //     setChecks({ ...checks, passwordCharacter: true });
  //   } else {
  //     setChecks({ ...checks, passwordCharacter: false });
  //   }

  //   if (letterRegex.test(user.password)) {
  //     setChecks({ ...checks, passwordLetter: true });
  //   } else {
  //     setChecks({ ...checks, passwordLetter: false });
  //   }

  //   if (numRegex.test(user.password)) {
  //     setChecks({ ...checks, passwordNum: true });
  //   } else {
  //     setChecks({ ...checks, passwordNum: false });
  //   }
  // };

  // const isPasswordMatch = (value) => {
  //   if (user.password === user.confirm && user.password.length >= 8) {
  //     setChecks({ ...checks, passwordconfirm: true });
  //   } else {
  //     setChecks({ ...checks, passwordconfirm: false });
  //   }
  // };

  // const isfirstNameValid = (value) => {
  //   console.log(user.firstName);
  //   if (
  //     !value.includes(" ") &&
  //     user.firstName.length > 0 &&
  //     letterRegex.test(value) &&
  //     !numRegex.test(value)
  //   ) {
  //     setChecks({ ...checks, firstNameCharacter: true });
  //   } else {
  //     setChecks({ ...checks, firstNameCharacter: false });
  //   }
  // };

  // const islastNameValid = () => {
  //   if (
  //     !user.lastName.includes(" ") &&
  //     user.lastName.length > 0 &&
  //     letterRegex.test(user.lastName) &&
  //     !numRegex.test(user.firstName)
  //   ) {
  //     setChecks({ ...checks, lastNameCharacter: true });
  //   } else {
  //     setChecks({ ...checks, lastNameCharacter: false });
  //   }
  // };

  // const isEmailValid = () => {
  //   if (emailRegex.test(user.email)) {
  //     setChecks({ ...checks, emailValid: true });
  //   } else {
  //     setChecks({ ...checks, emailValid: false });
  //   }
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(
      data.get("firstName"),
      data.get("lastName"),
      data.get("email"),
      data.get("password")
    );
    axios
      .post("api/signup", {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
      })
      .then((res) => {
        sessionStorage.setItem("usertoken", res.data.authToken);
        props.handleLogin();
      })
      .catch((err) => console.log(err));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={user.firstName}
                  onChange={(e) => handleChange(e)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={user.lastName}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={user.email}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={user.password}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm"
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                  autoComplete="new-password"
                  value={user.confirm}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
