import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase.js";
import { getAuth } from "firebase/auth";
import LogoutButton from "./buttons/LogoutButton";
import ChatLoad from "./ChatLoad";
import PrimaryCard from "./cards/PrimaryCard";

const Home = ({ userName }) => {
  const auth = getAuth(app);
  console.log("userName", userName);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const profileButtonHandler = () => {
    navigate(`/profile/${auth.currentUser.displayName}`);
  };

  return (
    <div className="homeView">
      <h1 className="homeTitle">
        Hello{" "}
        <span className="userNameStyle">
          {" "}
          {auth.currentUser.displayName} !{" "}
        </span>
      </h1>
      <div className="homeContent">
        <h2 className="homeTitle"> Active Suscription : </h2>
        <div className="cardBox">
          <PrimaryCard
            className="card"
            cardName="Chat with Us"
            cardDetails="Can ask for help with any randome questions"
            work={() => navigate(`/profile/${auth.currentUser.displayName}`)}
          />
          <PrimaryCard
            className="card"
            cardName="Older Chat"
            cardDetails="Load older chats you have with Ask MOnkey"
            work={() => navigate("/old-chat")}
          />
        </div>
      </div>

      <div className="homeBottom">
        <button className="primary-btn" onClick={profileButtonHandler}>
          {" "}
          Go to Profile to Start New Chat
        </button>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Home;
