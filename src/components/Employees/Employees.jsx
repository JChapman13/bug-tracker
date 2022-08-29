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
  TablePagination,
  Collapse,
  Box,
  Typography,
  InputLabel,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Employees({ employeeList }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  function Row(info) {
    const [open, setOpen] = useState(false);
    console.log(info.emp);

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell component="th" scope="row">
            {info.emp.firstName + " " + info.emp.lastName}
          </TableCell>
          <TableCell align="left">{info.emp.role}</TableCell>
          <TableCell align="left">{info.emp.team}</TableCell>
          <TableCell align="left">{info.emp.email}</TableCell>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <EditIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Edit Info
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>
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
                        />
                      </TableCell>
                      <TableCell>
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
                        />
                      </TableCell>
                      <TableCell>
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
                        />
                      </TableCell>
                      <TableCell>
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
                        />
                      </TableCell>
                      <TableCell>
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
                        />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody></TableBody>
                </Table>
              </Box>
            </Collapse>
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
              <Paper
                elevation={3}
                sx={{
                  margin: "auto",
                  marginTop: "15vh",
                  width: "100%",
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
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Role</TableCell>
                        <TableCell align="left">Team</TableCell>
                        <TableCell align="left">Email</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {employeeList.map((emp, idx) => (
                        <Row key={emp._id} emp={emp} />
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
