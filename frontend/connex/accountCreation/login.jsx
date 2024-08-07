
import React from 'react';
import { useState } from 'react';
import axios from 'axios'
import { Link ,useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

function Login() {
  const navigate=useNavigate()
const [email,setemail]=useState('');
const [password,setPassword]=useState('');


function handelvalue(e){
   
  const {name,value}=e.target;

  if(name==='email'){
   setemail(value)
  }else{
    setPassword(value)
  }

}

 async function onsubmitdata(e){
   e.preventDefault();
   
   try {
    const responce=await axios.post('https://mernproject-1-ve4x.onrender.com/login', {
      email,
      password
    });

    console.log(responce.data)
    if(responce.data=='success'){
      toast.success('Login success',{
        position:'top-center',
       });
       Cookies.set('userId',email)
  
      window.location.href='/deshboard';
      
    }else if(responce.data=='wrong'){
      toast.success('password wrong',{
        position:'top-center',
       });
    }else{
      toast.success('User dose not exist',{
        position:'top-center',
       });
    }
  
   } catch (error) {
    toast.success(`${error.message}`,{
      position:'top-center',
     });
    console.log(error.message)
   }
  
}


  return (
    <div className='fo'>
    <div className="login_form">
      <form onSubmit={onsubmitdata}>
        <h3>Login with</h3>

        <div className="login_option">
          <div className="option">
            <a href="#">
              <img src="download.png" alt="Google" />
              <span>Google</span>
            </a>
          </div>
        </div>

        <p className="separator">
          <span><i className='bx bx-grid-alt'></i></span>
        </p>

        <div className="input_box">
          <label htmlFor="email">Email</label>
          <input name='email' onChange={handelvalue} placeholder="Enter email address" required />
        </div>

        <div className="input_box">
          <div className="password_title">
            <label htmlFor="password">Password</label>
          </div>
          <input name='password' onChange={handelvalue} placeholder="Enter your password" required />
        </div>

        <button type="submit">Log In</button>

        <p className="sign_up">Don't have an account? <Link to='/register'>Sign up</Link></p>
      </form>
     
    </div>
    </div>
  );
}

export default Login;
