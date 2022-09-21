import React, { useState, useEffect } from "react";
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Paper,
  Grow,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

function CreateEmployeePage() {
  const [checked, setChecked] = useState(false);
  const [employeeInfo, setEmployeeInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    team: "",
  });
  let navigate = useNavigate();

  useEffect(() => {
    setChecked(true);
  }, []);

  const handleChange = (event) => {
    setEmployeeInfo({
      ...employeeInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const fetchResponse = await fetch("/api/create-employee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: employeeInfo.firstName,
          lastName: employeeInfo.lastName,
          email: employeeInfo.email,
          role: employeeInfo.role,
          team: employeeInfo.team,
        }),
      });

      if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");

      navigate("/directory");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <AppBar sx={{ boxShadow: "none" }}>
        <Toolbar className="teams-banner">
          <Typography variant="h3">Add Employee</Typography>
        </Toolbar>
        <Toolbar className="teams-menu-banner"></Toolbar>
      </AppBar>
      <Grid container spacing={2} direction="column">
        <Grow in={checked} {...(checked ? { timeout: 1000 } : {})}>
          <Grid item xs={10} md={5}>
            <Paper
              elevation={3}
              sx={{
                height: "75vh",
                width: "50rem",
                margin: "auto",
                marginTop: "15vh",
              }}
            >
              <Paper
                elevation={1}
                sx={{
                  backgroundColor: "#d1d9ff",
                  height: "5vh",
                }}
              >
                Add New Employee
              </Paper>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputLabel id="demo-simple-select-label">
                    First Name
                  </InputLabel>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    autoFocus
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel id="demo-simple-select-label">
                    Last Name
                  </InputLabel>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id="demo-simple-select-label">Email</InputLabel>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="simple-select"
                    name="role"
                    label="Role"
                    sx={{ width: "100%" }}
                    value={employeeInfo.role}
                    onChange={handleChange}
                    defaultValue=""
                  >
                    <MenuItem value={"Administrator"}>Administrator</MenuItem>
                    <MenuItem value={"Project Manager"}>
                      Project Manager
                    </MenuItem>
                    <MenuItem value={"Software Developer"}>
                      Software Developer
                    </MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <InputLabel id="demo-simple-select-label">Team</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="simple-select"
                    label="Role"
                    sx={{ width: "100%" }}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Add Employee
              </Button>
            </Paper>
          </Grid>
        </Grow>
      </Grid>
    </div>
  );
}

export default CreateEmployeePage;
