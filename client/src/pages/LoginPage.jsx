import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { setUserData} from '../utils/auth'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const { data } = await loginUser({ email, password });
      await setUserData(data);
      login({role: data.role})
      navigate('/admin/user');
    } catch (error) {
      alert('Invalid email or password');
    }
  };

  return (
    <div>
      <div className='login-box' style={{ boxShadow: '0px 0px 5px #000' }}>
        <div className='login-logo'>
          <h1>BizEx</h1>
        </div>
        <div className='login-email'>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className='login-pwd'>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className='login-sub-btn'>
          <button onClick={()=>handleLogin()}>Log In</button>
        </div>
        <div style={{textAlign:'center'}}>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
