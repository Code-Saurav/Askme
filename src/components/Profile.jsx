import React from "react";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from "../firebase.js";
import "../index.css";
import { useNavigate, Link } from "react-router-dom";
import LogoutButton from "./buttons/LogoutButton";
import ChatComponent from './ChatComponent';

const Profile = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const [instruction, setInstruction] = useState("");

  const homeButtonHandler = () => {
    navigate("/home");
  };

  const onInstructionChangeHandler = (event) => {
    setInstruction(event.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(instruction);
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
        <ChatComponent/>
      </div>

      <button className="secondary-btn" onClick={homeButtonHandler}>
        Home
      </button>
      <LogoutButton />
    </div>
  );
};

export default Profile;
