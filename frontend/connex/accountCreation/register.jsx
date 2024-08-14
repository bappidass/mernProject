import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import '../src/css/register.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
const { VITE_BACKEND_URL } = import.meta.env;

function Register() {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpbtnstatus, setOtpbtnstatus] = useState('send');
  const [univercity, setUnivercity] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state

  const sendDATA = `
    <div style={{ color: 'red' }}>
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
    </div>`;

  function handleValue(e) {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'name') {
      setName(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'otp') {
      setOtp(value);
    } else {
      setUnivercity(value);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();

    try {
     
      const response = await axios.post(`${VITE_BACKEND_URL}/register`, {
        name,
        email,
        univercity,
        password,
        otpbtnstatus
      });

    

      if (response.data === 'success') {
        console.log('Email sent successfully to that email');
     await axios.post(`${VITE_BACKEND_URL}/sendmail`, {
          name,
          email,
          sendDATA
        });
        toast.success('Account successfully created ', {
        position: 'top-center',
      });

        Cookies.set('userId',email);
        window.location.href='/';
      }else{
           toast.error('verification failed', {
              position: 'top-center',
            });
      }
    } catch (error) {
      toast.error(`${error.message}`, {
        position: 'top-center',
      });
      console.log(error);
    } 
  }

  async function verifyotp(e) {
    e.preventDefault();
    setLoading(true);
    if (otpbtnstatus === 'verified'){
      setLoading(false);
    }
    if (otpbtnstatus === 'send') {
      try {
        const response = await axios.post(`${VITE_BACKEND_URL}/sendotp`, {
          email,
          name,
        });
        if (response.data === 'already') {
          toast.error('User already exists', {
            position: 'top-center',
          });
        } else if (response.data === 'Enter email') {
          toast.error('Enter a valid email', {
            position: 'top-center',
          });
         
        } else if (response.data === 'success') {
          toast.success('OTP sent successfully', {
            position: 'top-center',
          });
          setOtpbtnstatus('verify');
        }
      } catch (error) {
        console.error('Error verifying OTP:', error);
        toast.error('Internal verification error', {
          position: 'top-center',
        });
      } finally {
        setLoading(false);
      }
    } else if (otpbtnstatus === 'verify') {
      if (otp === '') {
        toast.error('Enter an OTP', {
          position: 'top-center',
        });
      } else {
        try {
          const response = await axios.post(`${VITE_BACKEND_URL}/verifyOtp`, {
            email,
            otp
          });
          if (response.data === 'success') {
            setOtpbtnstatus('verified');
            toast.success('OTP verification success', {
              position: 'top-center',
            });
          } else if (response.data === 'notvailed') {
            toast.error('Enter a valid OTP', {
              position: 'top-center',
            });
            setLoading(false);
            setOtpbtnstatus('send');
          } else {
            setLoading(false);
            setOtpbtnstatus('send');
            toast.error('OTP verification failed', {
              position: 'top-center',
            });
          }
        } catch (error) {
          toast.error('Internal error', {
            position: 'top-center',
          });
        } finally {
          setLoading(false);
        }
      }
    }
  }

  return (
    <div className='fo'>
      <div className="login_form">
        <form>
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
            <label htmlFor="email">OTP</label>
            <div className="verify-otp">
              <input name='otp' onChange={handleValue} value={otp} placeholder="Enter OTP" />
              <button className="verify-otp-btn" onClick={verifyotp} disabled={loading}>
                {loading ? <ClipLoader color="#ffffff" size={20} /> : otpbtnstatus}
              </button>
            </div>
          </div>
          <div className="input_box">
            <label htmlFor="university">University</label>
            <input name='univercity' onChange={handleValue} value={univercity} placeholder="Enter Your University name" required />
          </div>
          <div className="input_box">
            <label htmlFor="password">Password</label>
            <input name='password' onChange={handleValue} value={password} placeholder="Enter Your Password" required/>
          </div>
          <button  onClick={onSubmit} >SIGNUP</button>
          <p className="sign_up">Already have an account? <Link to='/login'>Login</Link></p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
