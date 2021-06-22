import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import {User} from "../models/user";

const Nav: React.FC<{}> = () => {

  const [user, setUser] = useState(new User())

  useEffect(() => {
    (
      async () => {
        await axios.get('/user')
          .then(res => {
            const data = res.data;
            setUser(new User(
              data.id,
              data.first_name,
              data.last_name,
              data.email
            ))
          })
      }
    )()
  }, [])

  const logout = async () => {
    await axios.post('/logout', {})
  }

  return (
    <>
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <Link to={'/'} className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">会社名</Link>
        <ul className="my-2 my-md-0 mr-md-3">
          <Link to={'/profile'} className="p-2 text-white text-decoration-none" href="/">{user.name}</Link>
          <Link to={'/login'} className="p-2 text-white text-decoration-none" onClick={logout}>サインアウト</Link>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
