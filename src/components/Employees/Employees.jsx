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
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import "./Employees.css";

function Employees({ employeeList }) {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setChecked(true);
  }, []);

  const handleEdit = (emp) => {
    navigate("/employees/edit", { state: emp });
  };

  const handleDelete = async (emp) => {
    try {
      const fetchResponse = await fetch("/api/delete-employee", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: emp._id,
        }),
      });

      if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");

      navigate("/teams");
    } catch (err) {
      console.log(err);
    }
  };

  function Row(info) {
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
              onClick={() => handleEdit(info.emp)}
            >
              <EditIcon />
            </IconButton>
          </TableCell>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => handleDelete(info.emp)}
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
      <div className="employees-wrapper">
        <Grid container spacing={2} direction="column">
          <Grow in={checked} {...(checked ? { timeout: 1000 } : {})}>
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  margin: "10vh 0 0 2rem",
                  width: "75%",
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
                </Paper>
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="left"
                          sx={{ textDecoration: "underline" }}
                        >
                          Name
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ textDecoration: "underline" }}
                        >
                          Role
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ textDecoration: "underline" }}
                        >
                          Team
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ textDecoration: "underline" }}
                        >
                          Email
                        </TableCell>
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
