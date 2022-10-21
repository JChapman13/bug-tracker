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
  Autocomplete,
} from "@mui/material";

function CreateTeamPage(props) {
  const [checked, setChecked] = useState(false);
  const [teamList, setTeamList] = useState();

  useEffect(() => {
    setChecked(true);
  }, []);

  const handleChange = (event) => {};

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    } catch (err) {
      console.log(err);
    }
  };

  const handleAutocomplete = (event, value) => {
    console.log(event);
  };

  return (
    <div>
      <AppBar sx={{ boxShadow: "none" }}>
        <Toolbar className="teams-banner">
          <Typography variant="h3">Add Team</Typography>
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
                Add Team
              </Paper>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputLabel id="demo-simple-select-label">
                    Team Name
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
                <Grid item xs={6}>
                  <InputLabel id="demo-simple-select-label">
                    Add Employees
                  </InputLabel>
                  {/* <Autocomplete
                    freeSolo
                    sx={{ width: { xs: 200, md: 300 } }}
                    // options={employeeList.map(
                    //   (e) => e.firstName + " " + e.lastName
                    // )}
                    onChange={handleAutocomplete}
                    renderInput={(params) => (
                      <TextField
                        id="searchfield"
                        {...params}
                        placeholder="Enter employee name..."
                      />
                    )}
                  /> */}
                </Grid>
                <Grid item xs={6}>
                  <InputLabel id="demo-simple-select-label">
                    Add Team Leader
                  </InputLabel>
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

export default CreateTeamPage;
