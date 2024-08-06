import React, { useEffect } from 'react';
import '../css/profile.css'
import Cookies from 'js-cookie';
import axios from 'axios'
import Navbar from './navbar'
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
function Profile() {

  const [name,setname]=useState('');
  const [Uname,setUname]=useState('');


 
  
  navigation=useNavigate();

  useEffect(()=>{

  async function  fetchData(){
      try {
        const email= Cookies.get('userId');
        const responce = await axios.post('https://mernproject-1-ve4x.onrender.com/profile',{email})
        console.log(responce.data);
        setname(responce.data.name)
        setUname(responce.data.univercity)
       } catch (error) {
        console.log(error)
       }
    }

    fetchData()
  
  },[])


  async function  DeleteUser(){
    try {
      const email= Cookies.get('userId');
       await axios.post('https://mernproject-1-ve4x.onrender.com/DeletProfile',{email})
      toast.success(`Account permanently Deleted`,{
        position:'top-center',
       });

      navigation('/login')
     } catch (error) {
      console.log(error)
     }
  }

 


  return (
    <div>
    <Navbar/>
      <div className='user-profile' >
        <div className="sidebar-profile-box">
          <img className="cover-img" src="../images/cover-pic.png" alt="Cover" width="100%" />
          <div className="sidebar-profile-info">
            <img id="profile-pic" src="default_profile.png" alt="Profile" />
            <h1>{name}</h1>
            <p>{Uname}</p>
            <ul>
              <li>Your profile views <span>0</span></li>
              <li>Your post views <span>0</span></li>
              <li>Your connections <span>0</span></li>
            </ul>
          </div>
          <div className="sidebar-profile-link">
            <a href=""><img src="../images/items.png" alt="My items" />View Follower</a>
            <a href=""><img src="../images/premium.png" alt="Try Premium" />Edit Profile</a>
          </div>
        </div>
        <div className="sidebar-activity">
          <h3>RECENT</h3>
          <a href=""><img src="../images/recent.png" alt="Web Development" />Web Development</a>
          <h3>EXPERIENCE</h3>
          <a href=""></a>
          <h3>EDUCATION</h3>
        </div>
        <div className="sidebar-activity logout-button">
          <h3 onClick={()=>{
            Cookies.remove('userId')
            navigation('/login')
            toast.success(`Account Logout Successfully`,{
              position:'top-center',
             });
          }}>LOGOUT</h3>
           <h3 className='DELET-AC' onClick={()=>{
            DeleteUser();
           }}>DELETE ACCOUNT</h3>
        </div>
      </div>
      </div>
  );
}

export default Profile;
