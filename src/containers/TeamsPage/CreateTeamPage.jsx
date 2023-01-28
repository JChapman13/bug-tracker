import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import TopBar from "../../components/TopBar/TopBar.jsx";
import CreateTeam from "../../components/Teams/CreateTeam";

function CreateTeamPage() {
  const [employeeList, setEmployeeList] = useState();

  useEffect(() => {
    fetch("/api/employees").then((res) =>
      res.json().then((token) => {
        let result = JSON.parse(atob(token.split(".")[1])).employees;
        let empList = result.sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        );
        setEmployeeList(empList);
      })
    );
  }, []);

  if (!employeeList) {
    return (
      <>
        <h1>loading</h1>
      </>
    );
  }
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
        <CreateTeam employeeList={employeeList} />
      </Grid>
    </div>
  );
}

export default CreateTeamPage;
