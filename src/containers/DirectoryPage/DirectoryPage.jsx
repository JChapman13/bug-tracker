import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import "./DirectoryPage.css";
import DirectoryPageNav from "../../components/DirectoryPageNav/DirectoryPageNav";
import Teams from "../../components/Teams/Teams";
import Employees from "../../components/Employees/Employees";

function DirectoryPage() {
  const [toggleView, setToggleView] = useState(true);
  const [employeeList, setEmployeeList] = useState({});

  const togglePageView = (e) => {
    setToggleView(!toggleView);
  };

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

  return (
    <div className="teams-page-wrapper">
      <Grid container spacing={2} direction="column">
        <DirectoryPageNav togglePageView={togglePageView} />
        {toggleView ? <Teams /> : <Employees employeeList={employeeList} />}
      </Grid>
    </div>
  );
}

export default DirectoryPage;
