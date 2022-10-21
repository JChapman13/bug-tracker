import React from "react";
import { AppBar, Toolbar, Typography, Link } from "@mui/material";
import "./TopBar.css";

function TopBar({ pageName, createLinkName, mainLinkName }) {
  return (
    <AppBar sx={{ boxShadow: "none" }}>
      <Toolbar className="top-banner">
        <Typography variant="h3">{pageName}</Typography>
      </Toolbar>
      <Toolbar className="top-banner-links">
        <Link
          sx={{
            color: "white",
            textDecoration: "underline",
            marginLeft: ".5rem",
          }}
          href={"/teams"}
        >
          {mainLinkName}
        </Link>
        <Link
          sx={{
            color: "white",
            textDecoration: "underline",
            marginLeft: "1.5rem",
          }}
          href={"/teams/create"}
        >
          {createLinkName}
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
