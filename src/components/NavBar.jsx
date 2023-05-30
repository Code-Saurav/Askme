import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { app } from "../firebase.js";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const auth = getAuth(app);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [feedBackModal, setFeedBackModal] = useState(false);

  const feedBackHandler = () => {
    console.log("Feedback clicked");
    setFeedBackModal((prevState) => !prevState);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <nav className="NavBar">
        <div className="navbar-item">AskMe.com</div>
        <ul className="navbar-item">
          <li onClick={feedBackHandler}>Feedback</li>
          {isLoggedIn ? (
            <li className="userIcon">
              <FaUser />
              <span className="hint-text">{auth.currentUser.displayName}</span>
            </li>
          ) : (
            <li className="userIcon"> Login</li>
          )}
          {isLoggedIn ? (
            <li className="userIcon">
              <FiLogOut />
              <span className="hint-text">logout</span>
            </li>
          ) : (
            <li className="userIcon">SignUp</li>
          )}
        </ul>
      </nav>
      {feedBackModal && <div className="modal-overlay"></div>}
      {feedBackModal && (
        <div className="feedbackModal" onClick={feedBackHandler}>
          <div className="feedbackModal-content">
            <h2>Feedback Form </h2>
            <div className="modal-input-div">
              <input
                className="modal-input-control"
                type="text"
                placeholder="Name"
              />
              <input
                className="modal-input-control"
                type="email"
                placeholder="Email"
              />
              <textarea
                className="modal-input-control-text-area"
                id=""
                cols="30"
              ></textarea>

              <button className="submit-form-button"> Submit Form</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
