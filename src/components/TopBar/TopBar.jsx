import React from "react";
import { AppBar, Toolbar, Typography, Link } from "@mui/material";
import "./TopBar.css";

function TopBar({
  pageName,
  createLinkName,
  mainLinkName,
  mainLink,
  createLink,
}) {
  return (
    <AppBar className="top-bar-nav" sx={{ boxShadow: "none" }}>
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
          href={mainLink}
        >
          {mainLinkName}
        </Link>
        <Link
          sx={{
            color: "white",
            textDecoration: "underline",
            marginLeft: "1.5rem",
          }}
          href={createLink}
        >
          {createLinkName}
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
