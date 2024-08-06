import React from 'react'
import '../css/navbar.css'
import { Link } from 'react-router-dom'

function navbar() {
  return (
<nav class="navbar">
    <div class="navbar-left">
      <a class="logo"> <i class='bx bx-menu' ></i></a>
      <div class="search-box">
        <img src="../images/search.png" alt=""/>
        <input type="text" placeholder="search"/>
      </div>
    </div>
    <div class="navbar-center">
      <ul>
        <li><a href="#" class="active-link"><img src="../images/home.png" /><span>Home</span></a></li>
        <li><a href="#"><img src="../images/network.png" /><span>My Newtwork</span></a></li>
        <li><a href="#"><img src="../images/jobs.png" /><span>Queries</span></a></li>
        <li><a href="#"><img src="../images/message.png" /><span>Messagings</span></a></li>
        <li><a href="#"><img src="../images/notification.png" /><span>Notification</span></a></li>
      </ul>
    </div>
    <div class="navbar-right">
      <Link to='/profile'>
      <div class="online">
        <img src="default_profile.png" class="nav-profile-img" />
      </div>
      </Link>
    </div>
  </nav> 
  )
}

export default navbar
