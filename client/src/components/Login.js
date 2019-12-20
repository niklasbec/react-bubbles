import React from "react";
import axios from 'axios';

const Login = (props) => {

  const handleChange = e => {
    props.setCredentials({
        ...props.credentials,
        [e.target.name]: e.target.value
    })
  }

  const login = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', {
      username: props.credentials.username,
      password: props.credentials.password
    })
    .then(res => {
      localStorage.setItem('token', res.data.payload)
      props.history.push('/bubbles')
    })
    .catch(error => {
      console.log(`There was an error: ${error}`);
    })
  }


  
  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
          <input onChange={handleChange} placeholder='Username' type='text' name='username' value={props.credentials.username} />
          <input onChange={handleChange} placeholder='Password' type='password' name='password' value={props.credentials.password} />
          <input type='submit' />
      </form>
    </div>
  );
};

export default Login;
