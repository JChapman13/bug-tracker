import { useState, useEffect } from "react";
import Navbar from "./navbar/Navbar";
import Dashboard from "./containers/Dashboard/Dashboard";
import AuthPage from "./containers/AuthPage/AuthPage";
import DirectoryPage from "./containers/DirectoryPage/DirectoryPage";
import ProfilePage from "./containers/ProfilePage/ProfilePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateEmployeePage from "./containers/CreateEmployeePage/CreateEmployee";

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
              <Route path="/directory" element={<DirectoryPage />} />
              <Route path="/create-employee" element={<CreateEmployeePage />} />
            </Routes>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
