import React from 'react'
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {app} from '../../firebase.js'
import { useState } from 'react';
const LogoutButton = () => {

    const auth = getAuth(app)
  const navigate = useNavigate();
  const [loading, setLoading] = useState();


  const onLogoutHandler = () => {
    setLoading(true)
    auth.signOut();
    setLoading(false)
    navigate("/")
  }
  return (
    <button className = "primary-btn" onClick = {onLogoutHandler}> Logout</button>
  )
}

export default LogoutButton