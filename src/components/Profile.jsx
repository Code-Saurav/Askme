import React from "react";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from "../firebase.js";
import "../index.css";
import { useNavigate, Link } from "react-router-dom";
import LogoutButton from "./buttons/LogoutButton";
import ChatComponent from "./ChatComponent";
import Footer from './Footer';

const Profile = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const homeButtonHandler = () => {
    navigate("/home");
  };

  return (
    <div className="profile-container">
      <div className="user-info">
        <h1>Profile</h1>
        <p>Name : {auth.currentUser.displayName}</p>
        <p> Email : {auth.currentUser.email}</p>
      </div>
      <div className="Response">
        {" "}
        <ChatComponent />
      </div>

      <div className = "profileButton-container">
        <button className="primary-btn" onClick={homeButtonHandler}>
          Home
        </button>
        <LogoutButton />
      </div>
      <Footer/>
    </div>
  );
};

export default Profile;
