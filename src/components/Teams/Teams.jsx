import React, { useEffect, useState } from "react";
import {
  Paper,
  Grid,
  Grow,
  InputBase,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  IconButton,
  Link,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import "./Teams.css";
import axios from "axios";

function Teams({ teamList, employeeList, findTeams, setTeamList }) {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setChecked(true);
  }, []);

  // const searchTeams = async (event) => {
  //   try {
  //     fetch("/api/teams").then((res) =>
  //       res.json().then((token) => {
  //         let result = JSON.parse(atob(token.split(".")[1])).teams;
  //         let newTeamList = result.sort((a, b) =>
  //           a.firstName.localeCompare(b.firstName)
  //         );
  //         setTeamList(newTeamList);
  //       })
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleEdit = (emp) => {
    console.log(emp);
    navigate("/teams/edit", { state: emp });
  };

  const handleDelete = async (id) => {
    try {
      const fetchResponse = await fetch("/api/delete-team", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: id,
        }),
      });

      if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");
      let teamsEdit = teamList;
      teamsEdit.find((e, idx) => {
        if (e._id === id) {
          return teamsEdit.splice(idx, 1);
        }
      });
      findTeams();
    } catch (err) {
      console.log(err);
    }
  };

  const viewTeam = () => {};

  if (!teamList) {
    return <h1>Loading</h1>;
  }
  function Row(e) {
    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell component="th" scope="row">
            <Link style={{ cursor: "pointer" }} onClick={() => viewTeam()}>
              {e.teamInfo.name}
            </Link>
          </TableCell>
          <TableCell align="left">
            {e.teamInfo.leader.firstName} {e.teamInfo.leader.lastName}
          </TableCell>
          <TableCell align="left">{e.teamInfo.projectsNum}</TableCell>
          <TableCell align="left">{e.teamInfo.empsNum}</TableCell>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => handleEdit(e.teamInfo.emp)}
            >
              <EditIcon />
            </IconButton>
          </TableCell>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => handleDelete(e.teamInfo._id)}
            >
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <div>
      <div className="teams-page-wrapper">
        <Grid container spacing={2} direction="column">
          <Grow in={checked} {...(checked ? { timeout: 1000 } : {})}>
            <Grid item xs={12}>
              <Paper elevation={3}>
                <Paper
                  elevation={1}
                  sx={{
                    backgroundColor: "#d1d9ff",
                    height: "5vh",
                  }}
                >
                  <SearchIcon
                    sx={{
                      fontSize: "2rem",
                      marginTop: "1rem",
                      marginLeft: "1rem",
                    }}
                  />
                  <InputBase
                    placeholder="Search the current employee roster..."
                    id="standard-basic"
                    variant="standard"
                    sx={{
                      width: "30rem",
                      padding: "1rem",
                    }}
                  />
                </Paper>
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Team Name</TableCell>
                        <TableCell align="left">Team Lead</TableCell>
                        <TableCell align="left"># of Projects</TableCell>
                        <TableCell align="left"># of Employees</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {teamList.map((teamInfo, idx) => (
                        <Row key={teamInfo._id} teamInfo={teamInfo} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grow>
        </Grid>
      </div>
    </div>
  );
}

export default Teams;
