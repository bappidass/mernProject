import React, { useState } from 'react';
import axios from 'axios'
import '../src/css/register.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

function Register() {

 
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [univercity, setunivercity] = useState('');
  const sendDATA=` <div style={{ color: 'red' }}>
  <h2>Welcome to Connex</h2>
  <p>Dear ${name},</p>
  <p>Thank you for registering with us. Here are your account details and important information regarding your activities on our platform:</p>
  <h3>Login Details:</h3>
  <ul>
    <li>Email: ${email}</li>
    <li>Password: ${password}</li>
  </ul>
  <p>(Keep your login credentials safe and do not share them with anyone.)</p>
  <h3>Profile Information:</h3>
  <ul>
    <li>Full Name: ${name}</li>
  </ul>

  <p>If you have any questions or need assistance, feel free to contact our support team at connex.in.</p>
  <p>Thank you for choosing connex. We look forward to serving you!</p>
  <p>Best Regards,</p>
  <p>connex Team</p>
</div>`


  function handleValue(e) {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'name') {
      setName(value);
    } else if(name=='password') {
      setPassword(value);
    }else{
      setunivercity(value)
    }
  }

   async function onSubmit(e) {
    e.preventDefault();
     
    try {
         const responce=await axios.post('https://mernproject-1-ve4x.onrender.com/register', {
        name,
        email,
        univercity,
        password
     });
     toast.success(`${responce.data}`,{
      position:'top-center',
     });
       if(responce.data=='Account has been succesfully created'){
        console.log('Email sent succesfully to that email')
            await axios.post('https://mernproject-1-ve4x.onrender.com/sendmail', {
          name,
          email,
          sendDATA
       });
       }
     console.log(responce.data);
      navigate('/login')
    } catch (error) {
      toast.success(`${error.message}`,{
        position:'top-center',
       });
      console.log(error)
    }
  }

  


  return (
    <div className='fo'>
    <div className="login_form">
      <form onSubmit={onSubmit}>
        <h3>Register with</h3>

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
          <label htmlFor="name">Name</label>
          <input name='name' onChange={handleValue} value={name} placeholder="Enter Your Name" required />
        </div>
        <div className="input_box">
          <label htmlFor="email">Email</label>
          <input name='email' onChange={handleValue} value={email} placeholder="Enter email address" required />
        </div>
        <div className="input_box">
          <label htmlFor="university">University</label>
          <input name='univercity' onChange={handleValue} value={univercity} placeholder="Enter Your University name" required />
        </div>
        <div className="input_box">
          <label htmlFor="password">Password</label>
          <input name='password' onChange={handleValue} value={password} placeholder="Enter Your Password" required />
        </div>

        <button type="submit">SIGNUP</button>
        <p className="sign_up">Already have an account? <Link to='/login'>Login</Link></p>
      </form>
    </div>
    </div>
  );
}

export default Register;

