import React, {SyntheticEvent, useEffect, useState} from 'react';
import Wrapper from '../../components/Wrapper';
import axios from "axios";
import {Role} from "../../models/role";
import {Redirect} from "react-router-dom";

const UserEdit: React.FC<any> = (props) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [roleId, setRoleId] = useState(0)
  const [roles, setRoles] = useState([])
  const [redirect, setRedirect] = useState(false)
  const id = props.match.params.id

  useEffect(() =>{
    (
      async () => {
        const res = await axios.get('/roles')
        setRoles(res.data)

        const {data} = await axios.get(`/users/${id}`)
        setFirstName(data.first_name)
        setLastName(data.last_name)
        setEmail(data.email)
        setRoleId(data.role_id)
      }
    )()
  },[id])

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()

    await axios.put(`/users/${id}`, {
      first_name: firstName,
      last_name: lastName,
      email,
      role_id: roleId
    })
    setRedirect(true)
  }

  if (redirect) {
    return <Redirect to={'/users'} />
  }

  return (
    <>
      <Wrapper>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label htmlFor="first_name">First Name</label>
            <input
              value={firstName}
              type="text"
              className="form-control"
              name="first_name"
              onChange={(e) => {setFirstName(e.target.value)}}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="last_name">Last Name</label>
            <input
              value={lastName}
              type="text"
              className="form-control"
              name="last_name"
              onChange={(e) => {setLastName(e.target.value)}}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">email</label>
            <input
              value={email}
              type="text"
              className="form-control"
              name="email"
              onChange={(e) => {setEmail(e.target.value)}}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role">Role</label>
            <select
              value={roleId}
              name="role"
              className="form-control"
              onChange={(e) => {setRoleId(parseInt(e.target.value))}}
            >
              {
                roles.map((role: Role) => {
                  return (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  )
                })
              }
            </select>
          </div>
          <button className="btn btn-outline-info">Save</button>
        </form>
      </Wrapper>
    </>
  );
};

export default UserEdit;
