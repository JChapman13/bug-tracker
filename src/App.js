import { useState, useEffect } from "react";
import Navbar from "./navbar/Navbar";
import Dashboard from "./containers/Dashboard/Dashboard";
import AuthPage from "./containers/AuthPage/AuthPage";
import ProfilePage from "./containers/ProfilePage/ProfilePage";
import TeamsPage from "./containers/TeamsPage/TeamsPage";
import EmployeesPage from "./containers/EmployeesPage/EmployeesPage";
import CreateTeamPage from "./containers/TeamsPage/CreateTeamPage";
import CreateEmployeePage from "./containers/EmployeesPage/CreateEmployeePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setUserInState = (incomingUserData) => {
    setUser(incomingUserData);
  };

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    if (token) {
      let userDoc = JSON.parse(atob(token.split(".")[1])).user;
      console.log(userDoc, "this is the userDoc");
      setUser({ user: userDoc });
    }
  }, [isLoggedIn]);

  const handleLogin = async (userCredentials) => {
    try {
      const fetchResponse = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userCredentials.email,
          password: userCredentials.password,
        }),
      });

      if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");

      let token = await fetchResponse.json();
      sessionStorage.setItem("token", token);

      const userDoc = JSON.parse(atob(token.split(".")[1])).user;
      setUserInState(userDoc);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <Router>
        {user ? (
          <AuthPage setUserInState={setUserInState} handleLogin={handleLogin} />
        ) : (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/teams" element={<TeamsPage />} />
              <Route path="/teams/create" element={<CreateTeamPage />} />
              <Route path="/employees" element={<EmployeesPage />} />
              <Route
                path="/employees/create"
                element={<CreateEmployeePage />}
              />
            </Routes>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
