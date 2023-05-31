import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { app, db } from "../firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import Loading from "./Loading";
const NavBar = () => {
  const auth = getAuth(app);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [feedBackModal, setFeedBackModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    name: "",
    email: " ",
    feedbackMessage: "",
  });

  const { name, email, feedbackMessage } = feedbackData;

  const onChangeHandler = (e) => {
    setFeedbackData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const feedBackHandler = () => {
    setFeedBackModal((prevState) => !prevState);
  };

  const saveFeedbackData = async () => {
    const collectionRef = collection(db, "feedbacks");
    const timestamp = serverTimestamp();

    const data = { feedbackData: feedbackData, timestamp: timestamp };

    try {
      setLoading(true);
      await setDoc(doc(collectionRef, auth.currentUser.uid), data);
      toast.success("Feedback Form Submitted");
      setFeedbackData({
        name: "",
        email: " ",
        feedbackMessage: "",
      });
      setLoading(false);
    } catch (error) {
      // console.log(error);
      setLoading(false);
      toast.error("Could not submit feedback");
    }
  };
  // const feedbackCount = 0;

  const feedbackFormSubmit = (e) => {
    e.preventDefault();
    console.log("submitting Data");
    saveFeedbackData();
    console.log("Feedback Submitted");
    setFeedBackModal(false);
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
      <div>
        {feedBackModal && (
          <div className="overlay" onClick={feedBackHandler}></div>
        )}
        {feedBackModal && (
          <div className="feedbackModal">
            <form
              className="feedbackModal-content"
              onSubmit={feedbackFormSubmit}
            >
              <h2>Feedback Form </h2>
              <div className="modal-input-div">
                <input
                  className="modal-input-control"
                  type="text"
                  placeholder="Name"
                  value={ auth.currentUser ? auth.currentUser.displayName : name }
                  id="name"
                  onChange={onChangeHandler}
                />
                <input
                  className="modal-input-control"
                  type="email"
                  placeholder="Email"
                  value= { auth.currentUser ? auth.currentUser.email : email }
                  id="email"
                  onChange={onChangeHandler}
                />
                <textarea
                  className="modal-input-control-text-area"
                  id=""
                  cols="30"
                  value={feedbackMessage}
                  id="feedbackMessage"
                  onChange={onChangeHandler}
                ></textarea>

                <button type="submit" className="submit-form-button">
                  {" "}
                  Submit Form
                </button>
              </div>
            </form>
          </div>
        )}
        {loading && <Loading />}
      </div>
    </>
  );
};

export default NavBar;
