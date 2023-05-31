import { useState } from "react";
import "../index.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app, db } from "../firebase.js";
import { serverTimestamp, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { toast } from 'react-toastify';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const auth = getAuth(app);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    // Create user in the firebase with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        updateProfile(auth.currentUser, {
          displayName: name.trim(),
        });
        console.log(user);

        // Getting Doc Reference using collection for Firestore
        const usersCollectionRef = collection(db, "users");
        const userDocRef = doc(usersCollectionRef, user.uid);

        setDoc(userDocRef, {
          email: user.email,
          displayName: name,
          timestamp: serverTimestamp(),
        })
          .then(() => {
            toast.success("User Data Saved")
            navigate("/login");
            setLoading(false);
          })
          .catch((error) => {
            console.log("Error storing user Information");
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

    // Reset the form after signup
    setFormData({ email: "", name: "", password: "" });
  };

  return (
    <>
      <div className={!loading ? "container" : "container-disabled"}>
        <form onSubmit={submitHandler} className="form-container">
          <div className="pageTitle">
            <h1>Signup</h1>
          </div>
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={onChangeHandler}
            />
          </div>
          <div className="form-control">
            <label htmlFor="name">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value= {email}
              onChange={onChangeHandler}
            />
          </div>
          <div className="form-control">
            <label htmlFor="name">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <button type="submit" className="primary-btn">
              Sign Up
            </button>
          </div>

          <p>
            {" "}
            Existing member?{" "}
            <span>
              {" "}
              <Link to="/login"> Login here </Link>{" "}
            </span>
          </p>
        </form>
      </div>
      {loading && (
        <div className="space">
          <Loading />
        </div>
      )}
    </>
  );
};

export default Signup;
