import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaRobot } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
import { app, db } from "../firebase.js";
import { getAuth } from "firebase/auth";
import {
  collection,
  getDoc,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { updateDoc } from "firebase/firestore";
import ChatLoad from "./ChatLoad";
import TextToSpeech from "./TextToSpeech";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showOlderChat, setShowOlderChat] = useState(false);
  const auth = getAuth(app);

  const buttonRef = useRef();
  const buttonPressKey = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      buttonRef.current.click();
    }
  };
  // Load data from firebase
  const loadPreviousChatHandler = async () => {
    console.log("Loding chats");
    setShowOlderChat((prevState) => !prevState);
  };

  const sendMessage = async () => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const API_URL = "https://api.openai.com/v1/chat/completions";

    const payload = {
      messages: [
        {
          role: "system",
          content: "You are ChatGPT, a large language model trained by OpenAI.",
        },
        { role: "user", content: input },
      ],
      model: "gpt-3.5-turbo",
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    };

    try {
      const response = await axios.post(API_URL, payload, { headers });
      const data = response.data;
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "human", content: input },
        { role: "assistant", content: data.choices[0].message.content },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSend = () => {
    sendMessage();
    setShowOlderChat(false);
    setInput("");
  };

  const saveUserChatHistoryHandler = async () => {
    const collectionRef = collection(
      db,
      `userChatHistory/${auth.currentUser.uid}/chats`
    );
    // const dataNew = { [auth.currentUser.displayName]: messages };
    const timestamp = serverTimestamp();
    const dataNew = { messages: messages, timestamp: timestamp };
    try {
      const docRef = doc(collectionRef, "chatDocumentId");

      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        await updateDoc(docRef, dataNew);
      } else {
        await setDoc(docRef, dataNew);
      }

      toast.success("Updated chat in the database");
    } catch (error) {
      toast.error("Could not update chat in the database");
    }
  };

  return (
    <div className="askBox">
      <h2 className = "AskMonkey">Ask Monkey Chat </h2>

      <div className="chat-box">
        <ChatLoad />
      </div>

      {messages.length > 0 && (
        <div className="chat-box">
          <h2>Current Chat</h2>
          {/* Pre Load the chat existed before  */}
          {messages.map((message, index) => (
            <div
              className={`${
                message.role === "human" ? "response-tab" : "response-tab-user"
              }`}
              key={index}
            >
              {message.role === "human" ? (
                <p className="user-designation-human">
                  {" "}
                  <FaUser />
                </p>
              ) : (
                <p className="user-designation-human">
                  {" "}
                  <FaRobot />
                </p>
              )}
              <span className="singleMessage">{message.content}</span>
              {message.role === "assistant" && (
                <TextToSpeech speechText={message.content} />
              )}
            </div>
          ))}
        </div>
      )}
      <div className="askBox">
        <input
          className="request-text-control"
          type="text"
          value={input}
          placeholder="Ask Me Anything"
          onChange={handleInputChange}
          onKeyPress={buttonPressKey}
        />

        <div className="askButton">
          <button
            className="primary-btn-inn"
            onClick={handleSend}
            ref={buttonRef}
          >
            Send
          </button>
          <button className="small-btn-secondary">
            <FaMicrophone />
          </button>
        </div>
      </div>
      <button className="primary-btn" onClick={saveUserChatHistoryHandler}>
        {" "}
        Save the User Chat History
      </button>

      <button className="primary-btn" onClick={loadPreviousChatHandler}>
        {" "}
        Show Previous Chat
      </button>
    </div>
  );
};

export default ChatComponent;
