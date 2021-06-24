import React, {SyntheticEvent, useEffect, useState} from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import {Permission} from "../../models/permission";

const RoleEdit: React.FC<any> = (props) => {
  const [name, setName] = useState('')
  const [permissions, setPermissions] = useState([])
  const [selected, setSelected] = useState<number[]>([])
  const [redirect, setRedirect] = useState(false)
  const id = props.match.params.id

  useEffect(() => {
    (
      async () => {
        const res = await axios.get('/permissions')
        setPermissions(res.data)
        const {data} = await axios.get(`/roles/${id}`)
        setName(data.name)
        setSelected(data.permissions.map((p: Permission) => p.id))
      }
    )()
  },[id])

  console.log(selected)

  const check = (id: number) => {
    if (selected.some(s => s === id)) {
      setSelected(selected.filter(s => s !== id))
      return
    }

    setSelected([...selected, id])
  }

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()

    await axios.put(`/roles/${id}`, {
      name,
      permissions: selected
    })

    setRedirect(true)
  }

  if (redirect) {
    return <Redirect to={'/roles'} />
  }

  return (
    <>
      <Wrapper>
        <form onSubmit={submit}>
          <div className="mb-3 mt-3 row">
            <label htmlFor="first_name" className="col-sm-2 col-form-label">First Name</label>
            <div className="col-sm-10">
              <input
                value={name}
                type="text"
                className="form-control"
                name="first_name"
                onChange={(e) => {setName(e.target.value)}}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Permissions</label>
            <div className="col-sm-10">
              {
                permissions.map((permission: Permission) => {
                  return (
                    <div className="form-check form-check-inline col-3" key={permission.id}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selected.some((s) => s === permission.id)}
                        onChange={() => check(permission.id)}
                      />
                      <label className="form-check-label">{permission.name}</label>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <button className="btn btn-outline-info">Save</button>
        </form>
      </Wrapper>
    </>
  )
}

export default RoleEdit;
