import React, {SyntheticEvent, useState} from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [redirect, setRedirect] = useState(false)

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()
    await axios.post('/login', {
      email,
      password,
    })
      .then(() => {
        setRedirect(true)
      })
      .catch(err => console.log(err))
  }

  if (redirect) {
    return <Redirect to={'/'} />
  }

  return (
    <>
      <form className="form-signin" onSubmit={submit}>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="btn btn-lg btn-primary btn-block"
          type="submit"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
