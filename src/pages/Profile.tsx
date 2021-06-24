import React, {SyntheticEvent, useEffect, useState} from 'react';
import Wrapper from "../components/Wrapper";
import axios from "axios";

const Profile = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  useEffect(() => {
    (
      async () => {
        const {data} = await axios.get('/user')
        setFirstName(data.first_name)
        setLastName(data.last_name)
        setEmail(data.email)
      }
    )()
  },[])

  const infoSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    await axios.put('/user/info', {
      first_name: firstName,
      last_name: lastName,
      email
    })
  }

  const passwordSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    await axios.put('/user/password', {
      password,
      password_confirm: passwordConfirm
    })
  }

  return (
    <>
      <Wrapper>
        <h3>Account Information</h3>
        <form onSubmit={infoSubmit}>
          <div className="mb-3">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <button className="btn btn-outline-info">Save</button>
        </form>

        <h3 className="mt-4">Change Password</h3>
        <form onSubmit={passwordSubmit}>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Password Confirm</label>
            <input
              type="password"
              className="form-control"
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
            />
          </div>
          <button className="btn btn-outline-info">Save</button>
        </form>
      </Wrapper>
    </>
  );
};

export default Profile;
