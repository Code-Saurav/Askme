import React from 'react'
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {app} from '../../firebase.js'
const LogoutButton = () => {

    const auth = getAuth(app)
  const navigate = useNavigate();


  const onLogoutHandler = () => {
    auth.signOut();
    navigate("/")
  }
  return (
    <button className = "primary-btn" onClick = {onLogoutHandler}> Logout</button>
  )
}

export default LogoutButton