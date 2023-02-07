import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import TopBar from "../../components/TopBar/TopBar";
import EditTeam from "../../components/Teams/EditTeam";

function EditTeamPage() {
  return (
    <div className="create-employee-page-wrapper">
      <Grid container spacing={2} direction="column">
        <TopBar
          pageName="Teams"
          mainLink={"/teams"}
          createLinkName={"Add Team"}
          mainLinkName={"Teams"}
          createLink={"/teams/create"}
        />
        <Grid item xs={12} sm={6}>
          <EditTeam />
        </Grid>
      </Grid>
    </div>
  );
}

export default EditTeamPage;
