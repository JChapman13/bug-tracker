import {
  Grid,
  TextField,
  Box,
  ThemeProvider,
  Typography,
  Container,
  Button,
  Link,
  Avatar,
  CssBaseline,
  createTheme,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import "./CreateTeam.css";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

const theme = createTheme();

function CreateTeam() {
  const [teamInfo, setTeamInfo] = useState({
    teamName: "",
    department: "",
  });

  const handleChange = (event) => {
    setTeamInfo({ ...teamInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(teamInfo);
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
          <Avatar sx={{ m: 2, bgcolor: "secondary.main" }}>
            <GroupAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Team
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <TextField
                  required
                  fullWidth
                  id="team-name"
                  label="Team Name"
                  name="teamName"
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  required
                  fullWidth
                  name="department"
                  label="Department"
                  id="department"
                  onChange={(e) => handleChange(e)}
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
              Create
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default CreateTeam;
