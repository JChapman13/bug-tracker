import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import TopBar from "../../components/TopBar/TopBar";
import Employees from "../../components/Employees/Employees";
import { useLocation } from "react-router-dom";

function EmployeesPage() {
  const [employeeList, setEmployeeList] = useState();
  const [teamList, setTeamList] = useState();

  const location = useLocation();

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
  // }, [location]);

  if (!employeeList) {
    return (
      <>
        <h1>Loading</h1>
      </>
    );
  }
  return (
    <div className="teams-page-wrapper">
      <Grid container spacing={2} direction="column">
        <TopBar
          pageName="Employees"
          mainLink={"/employees/create"}
          mainLinkName={"Employees"}
          createLink={"/employees"}
          createLinkName={"Add Employee"}
        />
        <Grid item xs={12} sm={6}>
          <Employees employeeList={employeeList} />
        </Grid>
      </Grid>
    </div>
  );
}

export default EmployeesPage;
