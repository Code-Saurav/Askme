import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import { app } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatLoad from "./components/ChatLoad";

function App() {
  const auth = getAuth(app);

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={!loggedIn ? <Signup /> : <Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/old-chat" element={<ChatLoad />} />
          <Route path="/login" element={!loggedIn ? <Login /> : <Home />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
