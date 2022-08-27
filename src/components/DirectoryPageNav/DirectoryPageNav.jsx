import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

function DirectoryPageNav(props) {
  const handleSubmit = () => {
    props.togglePageView();
  };

  return (
    <AppBar sx={{ boxShadow: "none" }}>
      <Toolbar className="teams-banner">
        <Typography variant="h3">Directory</Typography>
      </Toolbar>
      <Toolbar className="teams-menu-banner">
        <Button
          className="roster-btn"
          id="teams"
          variant="text"
          sx={{ color: "white", textDecoration: "underline" }}
          onClick={(e) => handleSubmit(e)}
        >
          Teams
        </Button>
        <Button
          className="roster-btn"
          id="employees"
          variant="text"
          sx={{ color: "white", textDecoration: "underline" }}
          onClick={(e) => handleSubmit(e)}
        >
          Employees
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default DirectoryPageNav;
