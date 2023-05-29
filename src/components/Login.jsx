import { useState } from "react";
import "../index.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app, db } from "../firebase.js";
import { serverTimestamp, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaEye } from "react-icons/fa";

import Loading from "./Loading";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { email, password } = formData;

  const onChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onShowPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const focusPasswordInput = () => {
    const passwordInput = document.getElementById("password");
    if (passwordInput) {
      passwordInput.focus();
    }
  };

  const focusEmailInput = () => {
    const emailInput = document.getElementById("email");
    if (emailInput) {
      emailInput.focus();
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);

    // Login into user
    const auth = getAuth(app);
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user) {
          console.log("Login SuccessFull");
          navigate(`/profile/${auth.currentUser.displayName}`);
          setLoading(false);
          toast.success("Successfull Login");
          setFormData({ email: "", name: "", password: "" });
        }
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        if (errorCode === "auth/user-not-found") {
          toast.error("Email does not exist");
          focusEmailInput();
        }
        if (errorCode === "auth/wrong-password") {
          toast.error("Invalid Password");
          focusPasswordInput();
        }
      });
  };

  return (
    <>
      <div className={!loading ? "container" : "container-disabled"}>
        <form onSubmit={submitHandler} className="form-container">
          <div className="pageTitle">
            <h1>Login</h1>
          </div>
          <div className="form-control">
            <label htmlFor="name">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={onChangeHandler}
            />
          </div>
          <div className="form-control">
            <label htmlFor="name">Password</label>
            <div className="password-input">
              <input
                id="password"
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Password"
                value={password}
                onChange={onChangeHandler}
              />
              <span className="showPassword" onClick={onShowPasswordHandler}>
                {" "}
                <FaEye />
              </span>
            </div>
          </div>

          <div>
            <button type="submit" className="primary-btn">
              Login
            </button>
          </div>
          <p>
            {" "}
            Not a member?{" "}
            <span>
              {" "}
              <Link to="/"> SignUp here </Link>{" "}
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

export default Login;
