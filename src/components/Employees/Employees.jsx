import React, { useEffect, useState } from "react";
import {
  Paper,
  Grid,
  Grow,
  Button,
  InputBase,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";

function Employees(props) {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <div>
      <div className="teams-page-wrapper">
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
                  <Button variant="outlined" href="/create-employee">
                    Add Employee
                  </Button>
                </Paper>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ textDecoration: "underline" }}>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Role</TableCell>
                        <TableCell align="right">Team</TableCell>
                        <TableCell align="right">Email</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.employeeList.map((emp, idx) => (
                        <TableRow
                          key={emp.firstName + idx}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {emp.firstName + " " + emp.lastName}
                          </TableCell>
                          <TableCell align="right">{emp.role}</TableCell>
                          <TableCell align="right">{emp.team}</TableCell>
                          <TableCell align="right">{emp.email}</TableCell>
                          <IconButton aria-label="delete" id={emp._id}>
                            <EditIcon />
                          </IconButton>
                        </TableRow>
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

export default Employees;
