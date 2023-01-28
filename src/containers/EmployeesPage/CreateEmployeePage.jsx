import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import TopBar from "../../components/TopBar/TopBar";
import Employees from "../../components/Employees/Employees";
import CreateEmployee from "../../components/Employees/CreateEmployee";

function CreateEmployeePage() {
  return (
    <div className="create-employee-page-wrapper">
      <Grid container spacing={2} direction="column">
        <TopBar
          pageName="Employees"
          mainLink={"/employees"}
          mainLinkName={"Employees"}
          createLink={"/employees/create"}
          createLinkName={"Add Employee"}
        />
        <Grid item xs={12} sm={6}>
          <CreateEmployee />
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateEmployeePage;
