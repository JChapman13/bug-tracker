import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import TopBar from "../../components/TopBar/TopBar";
import Teams from "../../components/Teams/Teams";

export default function TeamsPage() {
  const [teamList, setTeamList] = useState({});

  // useEffect(() => {
  //   fetch("/api/teams").then((res) =>
  //     res.json().then((token) => {
  //       let result = JSON.parse(atob(token.split(".")[1])).employees;
  //       let sortTeamList = result.sort((a, b) =>
  //         a.firstName.localeCompare(b.firstName)
  //       );
  //       setTeamList(sortTeamList);
  //     })
  //   );
  // }, []);

  return (
    <div className="teams-page-wrapper">
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
        <Teams teamList={teamList} />
      </Grid>
    </div>
  );
}
