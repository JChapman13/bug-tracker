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

function Tickets() {
  const [checked, setChecked] = useState(false);

  function Row(e) {
    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell component="th" scope="row">
            <Link style={{ cursor: "pointer" }}></Link>
          </TableCell>
          <TableCell align="left">Test</TableCell>
          <TableCell align="left">Test</TableCell>
          <TableCell align="left">Test</TableCell>
          <TableCell>
            <IconButton aria-label="expand row" size="small">
              <EditIcon />
            </IconButton>
          </TableCell>
          <TableCell>
            <IconButton aria-label="expand row" size="small">
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <div>
      <div>
        <div className="ticket-page-wrapper">
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
                        <Row />
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            </Grow>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Tickets;
