import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Autocomplete,
  ListItem,
  List,
} from "@mui/material";

function CreateTeamPage(props) {
  const [checked, setChecked] = useState(false);
  const [addedEmployees, setAddedEmployees] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [leaderInputValue, setLeaderInputValue] = useState("");
  const [leader, setLeader] = useState("");
  const [teamName, setTeamName] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    setChecked(true);
  }, []);

  const handleChange = (event) => {
    setTeamName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const emailRegex = /-\s([^\s]+)\s\(/;
      const empIds = [];
      let leaderId = "";

      props.employeeList.map((e) => {
        const leaderEmail = leader.split(emailRegex);
        console.log(leaderEmail);
        if (e.email === leaderEmail[1]) {
          leaderId = e._id;
        }
      });

      addedEmployees.forEach((e) => {
        const emailCheck = e.split(emailRegex);

        props.employeeList.map((e) => {
          if (e.email === emailCheck[1]) {
            empIds.push(e._id);
          }
        });
      });
      console.log(teamName);
      console.log(leaderId);
      console.log(empIds);
      const fetchResponse = await fetch("/api/create-team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamName: teamName,
          leader: leaderId,
          employees: empIds,
        }),
      });

      if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");

      navigate("/teams");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (name) => {
    if (leader === name) {
      setLeader("");
    } else {
      let removal = addedEmployees.filter((e) => e !== name);
      setAddedEmployees(removal);
    }
  };

  return (
    <div>
      <Grid container spacing={2} direction="column">
        <Grow in={checked} {...(checked ? { timeout: 1000 } : {})}>
          <Grid item xs={10} md={5}>
            <Paper
              elevation={3}
              sx={{
                height: "50%",
                margin: "15vh 4rem 0 20rem",
                padding: "2rem",
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  marginBottom: "2rem",
                  fontSize: "2rem",
                }}
              >
                Team Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputLabel id="demo-simple-select-label">
                    Team Name
                  </InputLabel>
                  <TextField
                    name="teamName"
                    required
                    fullWidth
                    id="teamName"
                    autoFocus
                    value={teamName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel id="demo-simple-select-label">
                    Add Employees
                  </InputLabel>
                  <Autocomplete
                    clearOnEscape
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        setInputValue("");
                      }
                    }}
                    onChange={(event, newValue) => {
                      if (
                        (newValue !== null) | "" &&
                        !addedEmployees.includes(newValue) &&
                        !leader.includes(newValue)
                      ) {
                        setAddedEmployees([...addedEmployees, newValue]);
                        setInputValue("");
                      }
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    sx={{ width: { xs: 200, md: 300 } }}
                    options={props.employeeList.map(
                      (e) =>
                        `${e.firstName} ${e.lastName}\n - ${e.email} (${e.role}))`
                    )}
                    renderInput={(params) => (
                      <TextField
                        id="searchfield"
                        {...params}
                        placeholder="Enter employee name..."
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel id="add-team-leader-select-label">
                    Add Team Leader
                  </InputLabel>
                  <Autocomplete
                    clearOnEscape
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        setLeaderInputValue("");
                      }
                    }}
                    onChange={(event, newValue) => {
                      if (
                        (newValue !== null) | "" &&
                        !addedEmployees.includes(newValue)
                      ) {
                        setLeader(newValue);
                        setLeaderInputValue("");
                      }
                    }}
                    inputValue={leaderInputValue}
                    onInputChange={(event, newInputValue) => {
                      setLeaderInputValue(newInputValue);
                    }}
                    options={props.employeeList.map(
                      (e) =>
                        `${e.firstName} ${e.lastName}\n - ${e.email} (${e.role}))`
                    )}
                    renderInput={(params) => (
                      <TextField
                        id="searchfield"
                        {...params}
                        placeholder="Enter employee name..."
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <List>
                    <Typography sx={{ textDecoration: "underline" }}>
                      Team Leader
                    </Typography>
                    {leader ? (
                      <>
                        <ListItem>
                          {leader}{" "}
                          <Button onClick={() => handleDelete(leader)}>
                            X
                          </Button>
                        </ListItem>
                      </>
                    ) : (
                      <br />
                    )}
                    <Typography sx={{ textDecoration: "underline" }}>
                      Team Roster
                    </Typography>
                    {addedEmployees.map((name) => {
                      return (
                        <>
                          <ListItem>
                            {name}{" "}
                            <Button onClick={() => handleDelete(name)}>
                              X
                            </Button>
                          </ListItem>
                        </>
                      );
                    })}
                  </List>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Create Team
              </Button>
            </Paper>
          </Grid>
        </Grow>
      </Grid>
    </div>
  );
}

export default CreateTeamPage;
