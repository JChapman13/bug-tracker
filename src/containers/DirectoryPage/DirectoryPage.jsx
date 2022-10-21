import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import "./DirectoryPage.css";
import DirectoryPageNav from "../../components/DirectoryPageNav/DirectoryPageNav";
import Teams from "../../components/Teams/Teams";
import Employees from "../../components/Employees/Employees";
import { useLocation } from "react-router-dom";

function DirectoryPage() {
  const [toggleView, setToggleView] = useState(true);
  const [employeeList, setEmployeeList] = useState({});
  const [teamList, setTeamList] = useState({});

  const location = useLocation();

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
  }, [location]);

  useEffect(() => {
    fetch("/api/teams").then((res) =>
      res.json().then((token) => {
        let result = JSON.parse(atob(token.split(".")[1])).employees;
        let sortTeamList = result.sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        );
        setTeamList(sortTeamList);
      })
    );
  }, [location]);

  return (
    <div className="teams-page-wrapper">
      <Grid container spacing={2} direction="column">
        <Grid item xs={12} sm={6}>
          <DirectoryPageNav togglePageView={togglePageView} />
          {toggleView ? (
            <Teams teamList={teamList} />
          ) : (
            <Employees employeeList={employeeList} />
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default DirectoryPage;
