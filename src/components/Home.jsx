import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase.js";
import { getAuth } from "firebase/auth";
import LogoutButton from "./buttons/LogoutButton";

const Home = ({userName}) => {
  const auth = getAuth(app);
  console.log("userName" ,userName)

  const navigate = useNavigate();



  const profileButtonHandler = () => {

    navigate(`/profile/${auth.currentUser.displayName}`);
  };

  
  return (
    <div>
      <h1>
        You are logged In as, <span className="userNameStyle"> {auth.currentUser.displayName} </span>
      </h1>
      <button className="secondary-btn" onClick={profileButtonHandler}>
        {" "}
        Go to Profile
      </button>
      <LogoutButton />
    </div>
  );
};

export default Home;
