import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

function EditTeam() {
  const [checked, setChecked] = useState(false);
  const [addedEmployees, setAddedEmployees] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [leaderInputValue, setLeaderInputValue] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const [teamInfo, setTeamInfo] = useState({
    name: "",
    users: [],
    leader: "",
  });
  let navigate = useNavigate();
  const location = useLocation();
  let employeeTeamList = [];

  useEffect(() => {
    setChecked(true);
    setTeamInfo(location.state);
    setAddedEmployees(location.state.users);
    getEmployees();
  }, []);

  const getEmployees = async (e) => {
    fetch("/api/employees").then((res) =>
      res.json().then((token) => {
        let result = JSON.parse(atob(token.split(".")[1])).employees;
        let empList = result.sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        );
        employeeTeamList = empList;
        setEmployeeList(empList);
      })
    );
  };

  const handleChange = (event) => {
    setTeamInfo(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const emailRegex = /-\s([^\s]+)\s\(/;
      const empIds = [];
      let leaderId = "";

      teamInfo.users.map((e) => {
        const leaderEmail = teamInfo.leader.email.split(emailRegex);
        if (e.email === leaderEmail[1]) {
          leaderId = e._id;
        }
      });

      addedEmployees.forEach((e) => {
        const emailCheck = e.split(emailRegex);

        teamInfo.users.map((e) => {
          if (e.email === emailCheck[1]) {
            empIds.push(e._id);
          }
        });
      });
      const fetchResponse = await fetch("/api/create-team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamName: teamInfo.name,
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

  const handleDelete = (id) => {
    if (teamInfo.leader._id === id) {
      const { leader, ...rest } = teamInfo;
      setTeamInfo(rest);
    } else {
      const removal = teamInfo.users.filter((e) => e._id !== id);
      setTeamInfo({ ...teamInfo, users: removal });
    }
  };

  const handleLeaderChange = (e) => {
    const emailResult = emailCheck(e);
    employeeList.forEach((emp) => {
      if (emp.email === emailResult) {
        setTeamInfo({ ...teamInfo, leader: emp });
      }
    });
  };

  const checkLeader = (e) => {
    const emailResult = emailCheck(e);
    if (teamInfo.leader && teamInfo.leader.email === emailResult) {
      return false;
    } else {
      return true;
    }
  };

  const checkUsers = (e) => {
    const emailResult = emailCheck(e);
    if (
      teamInfo.users &&
      teamInfo.users.some((user) => user.email === emailResult)
    ) {
      return false;
    } else {
      return true;
    }
  };

  const emailCheck = (email) => {
    const emailRegex = /-\s([^\s]+)\s\(/;
    const emailCheck = email.split(emailRegex);
    return emailCheck[1];
  };

  const handleUserChange = (e) => {
    const emailResult = emailCheck(e);
    employeeList.forEach((emp) => {
      if (emp.email === emailResult) {
        setTeamInfo({ ...teamInfo, users: [...teamInfo.users, emp] });
      }
    });
  };
  if (!teamInfo && !employeeList) {
    return <h1>Loading</h1>;
  }
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
                    value={teamInfo.name}
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
                        (newValue !== null || newValue !== "") &&
                        checkUsers(newValue) &&
                        checkLeader(newValue)
                      ) {
                        handleUserChange(newValue);
                        setInputValue("");
                      }
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    sx={{ width: { xs: 200, md: 300 } }}
                    options={employeeList.map(
                      (e) =>
                        `${e.firstName} ${e.lastName}\n - ${e.email} (${e.role}
                        )`
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
                        (newValue !== null || newValue !== "") &&
                        checkUsers(newValue) &&
                        checkLeader(newValue)
                      ) {
                        handleLeaderChange(newValue);
                        setLeaderInputValue("");
                      }
                    }}
                    inputValue={leaderInputValue}
                    onInputChange={(event, newInputValue) => {
                      setLeaderInputValue(newInputValue);
                    }}
                    options={employeeList.map(
                      (e) =>
                        `${e.firstName} ${e.lastName}\n - ${e.email} (${e.role})`
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
                    {teamInfo.leader ? (
                      <>
                        <ListItem>
                          {teamInfo.leader.firstName} {teamInfo.leader.lastName}{" "}
                          - {teamInfo.leader.email}
                          <Button
                            onClick={() => handleDelete(teamInfo.leader._id)}
                          >
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
                    {teamInfo.users.map((emp) => {
                      return (
                        <>
                          <ListItem>
                            {emp.firstName} {emp.lastName} - {emp.email}
                            <Button onClick={() => handleDelete(emp._id)}>
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

export default EditTeam;
