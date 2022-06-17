import React, { useState } from "react";
import Login from "../../components/Login/Login";
import SignUp from "../../components/SignUp/SignUp";

function AuthPage(props) {
  const [toggleView, setToggleView] = useState(true);

  const setView = () => {
    setToggleView(!toggleView);
  };

  return (
    <>
      {toggleView ? (
        <SignUp setUserInState={props.setUserInState} setView={setView} />
      ) : (
        <Login setUserInState={props.setUserInState} setView={setView} />
      )}
    </>
  );
}

export default AuthPage;
