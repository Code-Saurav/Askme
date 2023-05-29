import { useState, useEffect } from "react";
import Signup from '../components/Signup';
import Login from '../components/Login';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    setIsLoggedIn(false)
  },[])

  return isLoggedIn? <Login/> : <Signup/>;
};

export default HomePage;
