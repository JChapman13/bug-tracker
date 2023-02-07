import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import TopBar from "../../components/TopBar/TopBar";
import EditEmployee from "../../components/Employees/EditEmployee";

function EditEmployeePage() {
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
          <EditEmployee />
        </Grid>
      </Grid>
    </div>
  );
}

export default EditEmployeePage;
