import React, {SyntheticEvent, useState} from 'react';
import axios from "axios";
import { Redirect } from 'react-router-dom';

const Register = () => {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [redirect, setRedirect] = useState(false)

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()
    await axios.post('/register', {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      password_confirm: passwordConfirm,
    })
      .then(() => {
        setRedirect(true)
      })
      .catch(err => console.log(err))
  }

  if (redirect) {
    return <Redirect to={'/login'} />
  }

  return (
    <>
      <form className="form-signin" onSubmit={submit}>
        <h1 className="h3 mb-3 font-weight-normal">Please register</h1>
        <input
          type="text"
          className="form-control"
          placeholder="First Name"
          required
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Last Name"
          required
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
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
        <input
          type="password"
          className="form-control"
          placeholder="Password Confirm"
          required
          value={passwordConfirm}
          onChange={e => setPasswordConfirm(e.target.value)}
        />
        <button
          className="btn btn-lg btn-primary btn-block"
          type="submit"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
