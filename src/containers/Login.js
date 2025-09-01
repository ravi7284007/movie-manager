import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  if (auth.user) {
    navigate('/movie-listing');
  }

  return (
    <div className="card loginCard p-4 shadow">

      <h3 className="mb-3">Login</h3>
      <p>Now it's time to access <br/>
      your account</p>
      {auth.error && <div className="alert alert-danger">{auth.error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control"
            value={'ravi@gmail.com'} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control"
            value={123456} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary" type="submit" disabled={auth.loading}>
          {auth.loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;

