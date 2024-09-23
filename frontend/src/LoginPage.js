import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import logo from './logo.png'; // Ensure this path is correct

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [birthdate, setBirthdate] = useState(''); // New state for birthdate
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isSignUp) {
      // Sign-up logic
      if (!validateSignUp()) {
        return;
      }
  
      try {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, username, email, password, birthdate })
        });
  
        const data = await res.json();
        console.log(data);
  
        if (res.status === 201) {
          localStorage.setItem('username', data.user.username);
          localStorage.setItem('uemail', data.user.email);
          localStorage.setItem('token', data.token);
          navigate('/home');
        } else {
          alert(data.error);
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      // Login logic
      if (!validateLogin()) {
        return;
      }
  
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await res.json();
        console.log(data);
  
        if (res.status === 200) { // Usually login success returns status 200
          localStorage.setItem('fullName', data.user.name);
          localStorage.setItem('username', data.user.username);
          localStorage.setItem('uemail', data.user.email);
          localStorage.setItem('userPhone', data.user.phone);
          localStorage.setItem('userBirthday', data.user.birthdate);
          localStorage.setItem('userPassword', data.user.password);
          
          navigate('/home');
        } else {
          alert(data.error);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };
  

  const validateSignUp = () => {
    // Basic email validation
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return false;
    }

    // Username validation
    if (!username || username.length < 4) {
      alert('Username must be at least 4 characters long.');
      return false;
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      alert(
        'Password must be at least 8 characters long and contain at least one symbol, one number, and one alphabet character.'
      );
      return false;
    }

    // Birthdate validation: Check if user is at least 13 years old
    const today = new Date();
    const birthDate = new Date(birthdate);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      age < 13 ||
      (age === 13 && monthDifference < 0) ||
      (age === 13 && monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      alert('You must be at least 13 years old to sign up.');
      return false;
    }

    return true;
  };

  const validateLogin = () => {
    // Basic email validation
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return false;
    }

    // Password validation (optional for login)
    if (!password) {
      alert('Please enter your password.');
      return false;
    }

    return true;
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="logo" />
      <h1 className="app-name">MeetUp</h1>
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit} className="login-form">
        {isSignUp && (
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        {isSignUp && (
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {isSignUp && (
          <div className="form-group">
            <label htmlFor="birthdate">Birthdate:</label>
            <input
              type="date"
              id="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit" className="submit-button">
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>
      </form>
      <button onClick={handleToggle} className="toggle-button">
        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};

export default LoginPage;
