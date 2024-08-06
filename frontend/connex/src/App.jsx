import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './component/navbar';
import Profile from './component/profile';
import Login from '../accountCreation/login';
import Register from '../accountCreation/register';
import Cookies from 'js-cookie';
import './App.css';

function App() {
  const login = Cookies.get('userId');
  
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={login ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/deshboard" element={login ? <Navbar /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={login? <Navigate to="/deshboard" />: <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;


