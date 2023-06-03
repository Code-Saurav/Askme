import React from "react";
import ChatLoad from "./ChatLoad";
import { useNavigate } from "react-router-dom";

const OlderChat = () => {
  const navigate = useNavigate();
  return (
    <div className="older-chatBox">
      <ChatLoad />
      <button
        className="primary-btn-short"
        onClick={() => navigate("/home")}
        style={{ margin: "5px" }}
      >
        Back To Home
      </button>
    </div>
  );
};

export default OlderChat;
