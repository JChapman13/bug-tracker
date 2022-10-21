import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import TopBar from "../../components/TopBar/TopBar";
import Teams from "../../components/Teams/Teams";
import CreateTeam from "../../components/Teams/CreateTeam";

function CreateTeamPage() {
  return (
    <div className="create-team-page-wrapper">
      <Grid container spacing={2} direction="column">
        <Grid item xs={12} sm={6}>
          <TopBar
            pageName="Teams"
            mainLink={"/teams"}
            createLinkName={"Add Team"}
            mainLinkName={"Teams"}
            createLink={"/teams/create"}
          />
        </Grid>
        <CreateTeam />
      </Grid>
    </div>
  );
}

export default CreateTeamPage;
