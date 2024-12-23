import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const { data } = await registerUser({ name, email, password });
      console.log("signup successful!");
      localStorage.setItem('token', data.token);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className='signup-box' style={{boxShadow: '0px 0px 5px #000' }}>
        <div className='signup-logo'>
          <h1>BizEx</h1>
        </div>
        <div className='signup-name'>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className='signup-email'>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className='signup-pwd'>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className='signup-sub-btn'>
          <button onClick={()=>handleSignUp()}>sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
