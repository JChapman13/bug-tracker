import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import TopBar from "../../components/TopBar/TopBar";
import Teams from "../../components/Teams/Teams";

export default function TeamsPage() {
  const [teamList, setTeamList] = useState([]);
  const [employeeList, setEmployeeList] = useState();
  let employeeTeamList = [];

  useEffect(() => {
    findEmployees();
  }, []);

  const findEmployees = async (e) => {
    fetch("/api/employees").then((res) =>
      res.json().then((token) => {
        let result = JSON.parse(atob(token.split(".")[1])).employees;
        let empList = result.sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        );
        employeeTeamList = empList;
        setEmployeeList(empList);
        findTeams();
      })
    );
  };

  const findTeams = async (e) => {
    fetch("/api/teams").then((res) => {
      res.json().then((token) => {
        let result = JSON.parse(atob(token.split(".")[1])).teams;
        const teamResult = [];
        result.map((e) => {
          let projectsNum = 0;
          let empsNum = 0;
          if (e.projects) {
            projectsNum = e.projects.length;
          }
          if (e.users) {
            empsNum = e.users.length;
          }
          const leader = employeeTeamList.find((emp) => emp._id === e.leader);
          teamResult.push({
            _id: e._id,
            name: e.name,
            leader: leader,
            projectsNum: projectsNum,
            empsNum: empsNum,
          });
        });
        setTeamList(teamResult);
      });
    });
  };

  if (!teamList && !employeeList) {
    return <h1>Loading</h1>;
  }
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
        <Teams
          teamList={teamList}
          employeeList={employeeList}
          setTeamList={setTeamList}
          findTeams={findTeams}
        />
      </Grid>
    </div>
  );
}
