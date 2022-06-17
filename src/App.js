import { useState, useEffect } from "react";
import Navbar from "./navbar/Navbar";
import Dashboard from "./containers/Dashboard/Dashboard";
import AuthPage from "./containers/AuthPage/AuthPage";

function App() {
  const [user, setUser] = useState(null);

  const setUserInState = (incomingUserData) => {
    console.log(incomingUserData);
    setUser(incomingUserData);
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      let userDoc = JSON.parse(atob(token.split(".")[1])).user;
      console.log(userDoc, "this is the userDoc");
      setUser({ user: userDoc });
    }
  }, []);

  return (
    <div className="App">
      {user ? <Dashboard /> : <AuthPage setUserInState={setUserInState} />}
    </div>
  );
}

export default App;
