import React, { useState, useContext } from 'react';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';

const MasterLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { masterLogin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await masterLogin({ username, password });
    if (success) {
      navigate('/adminDashboard'); // Adjust the route as needed
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Master Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default MasterLogin;
