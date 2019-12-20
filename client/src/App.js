import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";
import BubblePage from './components/BubblePage'

function App() {

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const [token, setToken] = useState()

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  )

  const logout = () => {
    localStorage.removeItem('token')
  }

  return (
    <Router>
      <div className="App">
        <div className='buttons'>
        <Link to='/login'>
        <button>Login</button>
        </Link>
        <Link to='/'>
        <button className='logout' onClick={logout}>Logout</button>
        </Link>
        </div>
        <PrivateRoute path='/bubbles' component={BubblePage} />
        <Route exact path='/login' render={(props) => <Login {...props} credentials={credentials} setCredentials={setCredentials}  />}/>
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
      </div>
    </Router>
  );
}

export default App;
